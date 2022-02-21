import {defineComponent, ref,} from 'vue';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Button, Textarea} from 'ant-design-vue';

const ArticleTextarea = {
  title: String,
  btnText: String,
}

export default defineComponent({
  name: 'ArticleTextarea',
  props: ArticleTextarea,
  components: {},
  setup(/*props, ctx*/) {
    const description = ref('');
    const articleText = ref('');

    return {
      description,
      articleText
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
                    auto-size/>
          <p class={cssCreateEdit.msg}>
            限30个字
          </p>

          <h3>内容简介</h3>
          <Textarea v-model={this.description}
                    placeholder="限30个字"
                    auto-size={{minRows: 2, maxRows: 3}}/>
          <p class={cssCreateEdit.msg}>
            限30个字
          </p>

          <h3>文章内容</h3>
          <Textarea v-model={this.articleText}
                    placeholder="限30000个字"
                    auto-size={{minRows: 5, maxRows: 8}}/>
          <p class={cssCreateEdit.msg}>
            限30000个字
          </p>

          <Button class="blog-btn">
            {this.btnText}
          </Button>

        </section>
      </>
    );
  }

});
