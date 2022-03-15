import {defineComponent, PropType,} from 'vue';
import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import {blogFullInfo} from '@/types/responseData';
import {Skeleton} from 'ant-design-vue';
// 渲染文章列表
import {useRenderArticleList} from '@/hooks/renderFn/useRenderArticleList';
// CSS module
import skeleton from '@/styles/skeleton.module.scss';

// 封装骨架屏
const MultiSkeletonProps = {
  isLoading: {type: Boolean, required: true},
  blogUser: {type: String as PropType<blogUserType>, defaults: 'self'},
  onDelete: {type: Function as PropType<onDeleteFnType>, default: () => {}},
  hasAvatar: {type: [Boolean, Object], default: false},
  hasParagraph: {type: [Boolean, Object], default: true},
  hasTitle: {type: [Boolean, Object], default: true},
  showHr: {type: Boolean, default: true},
};

export default defineComponent({
  name: 'MultiSkeleton',
  props: MultiSkeletonProps,
  components: {},
  setup(props, /*ctx*/) {
    const user = props.blogUser;
    const isShowHr = props.showHr;
    const randomPoNe = () => { return Math.round(Math.random()) * 2 - 1; };
    const randomDate = () => { return new Date(Date.now() + Math.random() * 10000 * 10000 * randomPoNe()); };
    const randomId = () => { return Math.trunc(Math.random() * 100) + 1; };
    const blankBlogData: () => blogFullInfo = () => {
      return {
        atIndex: true,
        id: randomId(),
        title: '',
        description: '',
        content: '',
        user: {
          id: randomId(),
          username: '',
          avatar: '',
          updatedAt: `${randomDate()}`,
          createdAt: `${randomDate()}`,
        },
        createdAt: `${randomDate()}`,
        updatedAt: `${randomDate()}`
      };
    };
    const fakeBlogList = new Array(20).fill(0).map(() => blankBlogData());

    const renderFakeArticleNode = () => {
      return (
        <div class={skeleton.space}>
          <Skeleton loading={props.isLoading}
                    avatar={props.hasAvatar || false}
                    paragraph={props.hasParagraph || true}
                    title={props.hasTitle || true}
                    active/>
          <br/>
          <hr v-show={isShowHr}/>
          <br/>
        </div>
      );
    };
    return {
      user,
      isShowHr,
      blankBlogData,
      fakeBlogList,
      renderFakeArticleNode,
    };
  },
  render() {
    return (
      <>
        {
          useRenderArticleList(
            this.fakeBlogList,
            this.renderFakeArticleNode,
            this.isLoading,
            this.user || 'self',
            this.onDelete || (() => {}))
        }
      </>
    );
  }

});
