import {getDetail} from '@/api/blog';
import UserLink from '@/components/user-authentication/UserLink';
import {blogUser} from '@/types/responseData';
import markdown from '@/utils/markdown';
import {defineComponent, onMounted,} from 'vue';
import cssDetail from '@/styles/blog-detail.module.scss';
import classNames from 'classnames';
import {useRoute} from 'vue-router';
import {beautifyDate} from '@/utils/beautifyDate';

export default defineComponent({
  name: 'BlogDetail',
  props: {},
  components: {},
  setup(/*props, ctx*/) {
    const route = useRoute();
    const blogId = ref('');
    const title = ref('');
    // const description = ref('');
    const createdAt = ref('');
    const rawContent = ref('');
    const user = ref<blogUser | null>(null);

    blogId.value = route.params.blogId as string;

    const getBlogDetail = async () => {
      blogId.value = route.params.blogId as string;
      const {data} = await getDetail({blogId: parseInt(blogId.value)});
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
      await getBlogDetail();
    });

    return {
      user,
      title,
      createdAt,
      rawContent,
    };
  },
  render() {
    if (this.user) {
      const {avatar, id: userId, username, /*updatedAt: updateUserAt, createdAt: createUserAt*/} = this.user;

      return (
        <>
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

          {/*正文内容*/}
          <section class={classNames(['article'])}>
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
