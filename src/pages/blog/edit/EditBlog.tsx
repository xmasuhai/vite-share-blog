import {defineComponent, ref} from 'vue';
import {Input, Button} from 'ant-design-vue';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';

export default defineComponent({
  name: 'EditBlog',
  props: {},
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
          <h1>编辑文章</h1>
          <h3>文章标题</h3>
          <Input placeholder="Autosize height with minimum and maximum number of lines"
                 auto-size/>
          <p class="msg">限30个字</p>
          <h3>内容简介</h3>
          <Input type="textarea"
                 v-model={this.description}
                 placeholder="Autosize height with minimum and maximum number of lines"
                 auto-size={{minRows: 2, maxRows: 3}}/>
          <p class="msg">限30个字</p>
          <h3>文章内容</h3>
          <Input type="textarea"
                 v-model={this.articleText}
                 placeholder="Autosize height with minimum and maximum number of lines"
                 auto-size={{minRows: 5, maxRows: 8}}/>
          <p class="msg">限30个字</p>
          <Button>确定</Button>
        </section>
      </>
    );
  }

});
