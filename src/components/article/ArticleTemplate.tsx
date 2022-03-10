import {defineComponent, ref,} from 'vue';
import useBlogStore from '@/store/modules/blog';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Button, Switch} from 'ant-design-vue';
import ArticleTextArea from '@/components/article/ArticleTextArea';

const ArticleTemplateProps = {
  mainTitle: String,
  btnText: String,
};

export default defineComponent({
  name: 'ArticleTemplate',
  props: ArticleTemplateProps,
  emits: ['handleClick',],
  components: {},
  setup(props, ctx) {
    const BlogStore = useBlogStore();

    const title = ref('');
    const description = ref('');
    const content = ref('');
    const atIndex = ref<boolean>(false);

    // 将变更 patch 到 BlogStore 中
    watch([title, description, content, atIndex],
      ([title, description, content, atIndex]) => {
        BlogStore.$patch({
          title,
          description,
          content,
          atIndex
        });
      }/*, {immediate: true}*/);

    const handleClick = () => {
      ctx.emit('handleClick');
    };

    const changeTitle = (payload: string) => {
      title.value = payload;
    };
    const changeDescription = (payload: string) => {
      description.value = payload;
    };
    const changeContent = (payload: string) => {
      content.value = payload;
    };

    return {
      title,
      description,
      content,
      atIndex,
      handleClick,
      changeTitle,
      changeDescription,
      changeContent
    };
  },
  render() {
    return (
      <section class={cssCreateEdit.createEdit}>
        <h1 class={cssCreateEdit.mainTitle}>
          {this.mainTitle}
        </h1>

        <ArticleTextArea subTitle="文章标题"
                         wordCount={30}
                         onInputValueChange={this.changeTitle}/>

        <ArticleTextArea subTitle="内容简介"
                         wordCount={30}
                         autoSize={{minRows: 2, maxRows: 2}}
                         onInputValueChange={this.changeDescription}/>

        <ArticleTextArea subTitle="文章内容(仅限Markdown格式)"
                         wordCount={30000}
                         autoSize={{minRows: 18, maxRows: 18}}
                         onInputValueChange={this.changeContent}/>

        {/* 首页展示开关 */}
        <div class={cssCreateEdit.switchBox}>
          <label class={cssCreateEdit.label} for="isShowAtIndex">
            <span class={cssCreateEdit.labelText}>
              是否展示到首页：
            </span>
            <Switch id="isShowAtIndex"
                    v-model:checked={this.atIndex}/>
          </label>
        </div>

        <Button class="blog-btn"
                onClick={this.handleClick}>
          {this.btnText}
        </Button>

      </section>
    );
  }

});
