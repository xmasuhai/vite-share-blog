import {defineComponent, ref,} from 'vue';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Button, Textarea, Switch} from 'ant-design-vue';
import createArticle from '@/styles/article.module.scss';

const ArticleTextarea = {
  mainTitle: String,
  btnText: String,
};

export default defineComponent({
  name: 'ArticleTextarea',
  props: ArticleTextarea,
  emits: ['handleClick',],
  components: {},
  setup(props, ctx) {
    const title = ref('');
    const description = ref('');
    const content = ref('');
    const atIndex = ref<boolean>(false);

    const handleClick = () => {
      ctx.emit('handleClick');
    };

    return {
      title,
      description,
      content,
      atIndex,
      handleClick
    };
  },
  render() {
    return (
      <>
        <section class={cssCreateEdit.create}>
          <h1 class={cssCreateEdit.article}>
            {this.title}
          </h1>

          <h3>文章标题</h3>
          <Textarea placeholder="限30个字"
                    auto-size
                    v-model={this.title}/>
          <p class={cssCreateEdit.msg}>
            限30个字
          </p>

          <h3>内容简介</h3>
          <Textarea placeholder="限30个字"
                    auto-size={{minRows: 2, maxRows: 3}}
                    v-model={this.description}/>
          <p class={cssCreateEdit.msg}>
            限30个字
          </p>

          <h3>文章内容</h3>
          <Textarea placeholder="限30000个字"
                    auto-size={{minRows: 18, maxRows: 30}}
                    v-model={this.content}/>
          <p class={cssCreateEdit.msg}>
            限30000个字
          </p>

          <div class={cssCreateEdit.switchBox}>
            <label for="isShowAtIndex"> 是否展示到首页：
              <Switch id="isShowAtIndex"
                      v-model:checked={this.atIndex}/>
            </label>
          </div>

          <Button class="blog-btn"
                  onClick={this.handleClick}>
            {this.btnText}
          </Button>

        </section>
      </>
    );
  }

});
