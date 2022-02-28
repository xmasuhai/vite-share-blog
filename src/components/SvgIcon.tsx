import {defineComponent,} from 'vue';
import blogIcon from '@/styles/blog-icon.module.scss';

const props = {
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  tipText: {
    type: String,
    default: '',
  }
};

export default defineComponent({
  name: 'SvgIcon',
  props: props,
  components: {},
  setup(props/*, ctx*/) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return {
      symbolId
    };
  },
  render() {
    return (
      <ruby class={blogIcon.ruby}>
        <svg class={blogIcon.icon}
             aria-hidden="true">
          <use href={this.symbolId}
               fill={this.color}/>
        </svg>
      </ruby>
    );
  }

});
