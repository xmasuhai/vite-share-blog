import {defineComponent, onMounted,} from 'vue';
import {useRoute} from 'vue-router';
import {getDetail} from '@/api/blog';
import {blogUser} from '@/types/responseData';
import UserLink from '@/components/user-authentication/UserLink';
import markdown from '@/utils/markdown';
import cssDetail from '@/styles/blog-detail.module.scss';
import classNames from 'classnames';
import {beautifyDate} from '@/utils/beautifyDate';
import {useIfLoading} from '@/hooks/useIfLoading';
import {Skeleton} from 'ant-design-vue';
import skeleton from '@/styles/skeleton.module.scss';
import {scrollToTop} from '@/utils/scrollToTop';

export default defineComponent({
  name: 'BlogDetail',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const route = useRoute();
    const blogId = ref('');
    const title = ref('');
    const createdAt = ref('');
    const rawContent = ref('');
    const user = ref<blogUser | null>(null);

    // 是否处于读取中状态，用来判断是否展示骨架屏
    const {loading} = useIfLoading();

    // response data
    const getBlogDetail = async () => {
      // 从路由url中获取参数 blogId
      blogId.value = route.params.blogId as string;
      // 传参 blogId 获取博客详情数据 data
      const {data} = await getDetail({blogId: parseInt(blogId.value)});
      // 从博客详情数据 data 获取作者信息
      const {
        title: blogTitle,
        content: blogContent,
        createdAt: blogCreatedAt,
        user: blogUser
      } = data;
      title.value = blogTitle;
      createdAt.value = beautifyDate(blogCreatedAt);
      user.value = blogUser;
      rawContent.value = blogContent;
    };

    onMounted(async () => {
      scrollToTop();
      await getBlogDetail();
    });

    return {
      user,
      title,
      createdAt,
      rawContent,
      loading
    };
  },
  render() {
    if (this.user) {
      const {avatar, id: userId, username,} = this.user;

      return (
        <>
          {/* 作者信息 与发布时间 */}
          <section class={cssDetail.userBlog}>
            <UserLink userId={userId}>
              <img src={avatar}
                   alt={username}
                   class={cssDetail.avatar}/>
            </UserLink>
            <h3 class={cssDetail.title}>
              {this.title || ''}
            </h3>
            <p class={cssDetail.user}>
              <UserLink userId={userId}>
                {username}
              </UserLink>
              <span class={cssDetail.createdAt}>
                发布于
              </span>
              <span class={cssDetail.date}>
                {`${this.createdAt || ''}`}
              </span>
            </p>
          </section>

          {/* 骨架屏内容 */}
          <section class={skeleton.space}>
            <Skeleton loading={this.loading}
                      avatar={false}
                      paragraph={{rows: 8}}
                      title={true}
                      active/>
          </section>

          {/* 正文内容 */}
          <section class={classNames(['article'])}
                   v-show={!this.loading}>
            <article class={classNames(['blog-article', 'markdown-body'])}
                     v-html={markdown(this.rawContent)}>
              {/* renderArticleDom() */}
            </article>
          </section>
        </>
      );
    }
  }

});
