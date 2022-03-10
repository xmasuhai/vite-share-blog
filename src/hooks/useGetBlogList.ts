import {useRoute, useRouter} from 'vue-router';
import {ref} from 'vue';
import {blogFullInfo, blogUser} from '@/types/responseData';
import useAuthStore from '@/store/modules/auth';
import {getBlogByUserId} from '@/api/blog';
import {scrollToTop} from '@/utils/scrollToTop';

export default function useGetBlogList(blogUser: 'self' | 'others') {
  // Router Data
  const route = useRoute(); // 获取当前路由
  const router = useRouter(); // 获取当前路由

  // Store Data
  const authStore = useAuthStore();
  const userData = authStore.getUser;
  const {id} = userData as blogUser;

  // response data
  const blogDataList = ref<blogFullInfo[] | undefined>([]);
  const currentPage = ref(1);
  const allPages = ref(0);
  const pageSize = ref(20);
  const user = ref<blogUser | null>(null);
  const userId = ref(0);
  const showEmptyPage = ref(false);

  const renewData = (
    blogList: blogFullInfo[] | undefined,
    totalPage: number,
    page: number,
    totalDataCount: number) => {
    blogList && (blogDataList.value = blogList);
    totalDataCount && totalPage && (allPages.value = (pageSize.value * totalPage));
    page && (currentPage.value = page);
  };

  // 调用 getBlogByUserId API 获取所有博客列表
  // 需要 userId
  const invokeBlogByUserIdAPI = async (pageNum: number) => {
    const uid = (
      blogUser === 'self'
        ? id
        : userId.value
    );
    const {
      data: blogList,
      total: totalDataCount,
      totalPage,
      page
    } = await getBlogByUserId({page: pageNum}, uid,);

    renewData(blogList, totalPage, page, totalDataCount);

    return {
      blogList,
      totalPage,
      page
    };
  };

  const getBlogList = async () => {
    userId.value = parseInt(route.params.userId as string) || 1;
    currentPage.value = parseInt(route.query.page as string) || 1;

    const {blogList,} = await invokeBlogByUserIdAPI(currentPage.value);
    ;(blogList && blogList.length > 0) && (user.value = blogList[0].user);

    // data为空数组，展示空页面
    if (blogList?.length === 0) {
      showEmptyPage.value = true;
    }

  };

  const onPageChange = async (newPage: number) => {
    const {blogList} = await invokeBlogByUserIdAPI(newPage);
    const {user} = (
      blogList
        ? blogList?.[0]
        : {user: {id: 0}}
    );

    const pathStr = (
      blogUser === 'self'
        ? '/myblog'
        : user.id
    );
    await router.push({path: `${pathStr}`, query: {page: newPage}, replace: true});
    scrollToTop();
  };

  onMounted(async () => {
    await getBlogList();
  });

  return {
    blogDataList,
    currentPage,
    allPages,
    pageSize,
    user,
    showEmptyPage,
    onPageChange,
  };
}

/*
*
// 使用　useGetBlogList
const {
  blogDataList,
  currentPage,
  allPages,
  pageSize,
  user,
  showEmptyPage,
  onPageChange
} = useGetBlogList()
*
* */

