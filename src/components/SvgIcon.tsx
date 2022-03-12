import classNames, {Argument} from 'classnames';
import {defineComponent, PropType,} from 'vue';
import blogIcon from '@/styles/blog-icon.module.scss';

const SvgIconProps = {
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
  },
  scaleSize: {
    type: Number,
    default: 1,
  },
  additionalClassList: {
    type: Array as PropType<Argument[]>,
    default: []
  }
};

export default defineComponent({
  name: 'SvgIcon',
  props: SvgIconProps,
  components: {},
  setup(props/*, ctx*/) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return {
      symbolId
    };
  },
  render() {
    return (
      <ruby class={classNames(blogIcon.ruby, ...this.additionalClassList)}>
        <svg class={classNames(blogIcon.icon,)}
             aria-hidden="true">
          <use href={this.symbolId}
               fill={this.color}/>
        </svg>
      </ruby>
    );
  }

});
