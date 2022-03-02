import {defineComponent, PropType, watch, ref} from 'vue';
import cssCreateEdit from '@/styles/blog-create-edit.module.scss';
import {Textarea} from 'ant-design-vue';

const ArticleTextAreaProps = {
  subTitle: String,
  autoSize: {type: Object, default: {minRows: 1, maxRows: 1}},
  wordCount: {type: Number, default: 30},
  checkWordCount: Function as PropType<() => void>,
};

export default defineComponent({
  name: 'ArticleTextArea',
  props: ArticleTextAreaProps,
  emits: ['inputValueChange'],
  components: {},
  setup(props, ctx) {
    const inputString = ref('');

    // 将变更 patch 到 BlogStore 中
    watch([inputString],
      ([inputString]) => {
        ctx.emit('inputValueChange', inputString);
      }/*, {immediate: true}*/);

    return {
      inputString
    };
  },
  render() {
    return (
      <>
        <h3>{this.subTitle}</h3>
        <Textarea placeholder={`在此输入${this.subTitle}，限${this.wordCount}个字`}
                  auto-size={this.autoSize}
                  v-model:value={this.inputString}/>
        <p class={cssCreateEdit.msg}>
          {`0/${this.wordCount}`} {/* TODO 校验逻辑 */}
        </p>
      </>
    );
  }

});