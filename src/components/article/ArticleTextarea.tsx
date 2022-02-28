import {defineComponent, ref,} from 'vue';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Button, Textarea, Switch} from 'ant-design-vue';

const ArticleTextarea = {
  mainTitle: String,
  btnText: String,
};

export default defineComponent({
  name: 'ArticleTextarea',
  props: ArticleTextarea,
  components: {},
  setup(/*props, ctx*/) {
    const title = ref('');
    const description = ref('');
    const content = ref('');
    const atIndex = ref<boolean>(false);

    return {
      title,
      description,
      content,
      atIndex
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

          <p>
            <label for="isShowAtIndex"> 是否展示到首页：
              <Switch id="isShowAtIndex"
                      v-model:checked={this.atIndex}/>
            </label>
          </p>

          <Button class="blog-btn">
            {this.btnText}
          </Button>

        </section>
      </>
    );
  }

});
