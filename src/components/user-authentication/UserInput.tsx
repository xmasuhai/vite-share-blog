import {defineComponent, PropType,} from 'vue';
import cssAuth from '@/styles/auth.module.scss';
import {Input} from 'ant-design-vue';

const UserInputProps = {
  title: String,
  inputType: {type: String, default: ''},
  placeholder: String,
  errorText: String,
  keyUpHandler: Function as PropType<() => void>,
  autoComplete: {type: String, default: 'on'},
  inputValue: {type: String, default: ''},
  showError: {type: Boolean, default: false},
};

export default defineComponent({
  name: 'UserInput',
  props: UserInputProps,
  emits: ['keyUp', 'update:username', 'update:password', 'update:passwordCheck'],
  components: {},
  setup(props, ctx) {
    const isShowError = computed(() => {
      return props.showError;
    });

    const keyUpHandler = (e: KeyboardEvent) => {
      ctx.emit('keyUp', e);
    };

    const changeValue = (e: InputEvent) => {
      ctx.emit('update:password', (e.target as HTMLInputElement).value);
      ctx.emit('update:passwordCheck', (e.target as HTMLInputElement).value);
      ctx.emit('update:username', (e.target as HTMLInputElement).value); // 以前是 `this.$emit('input', title)`
    };

    return {
      keyUpHandler,
      changeValue,
      isShowError
    };
  },
  render() {
    return (
      <div>
        <label for={this.title}>
          <h4 class={cssAuth.password}>
            {this.title}
          </h4>
          <Input type={this.inputType}
                 placeholder={this.placeholder ?? this.title}
                 id={this.title}
                 class={cssAuth.userInput}
                 onKeyup={this.keyUpHandler}
                 onInput={this.changeValue}
            // @ts-ignore
                 autoComplete={this.autoComplete}/>
        </label>
        <p class={cssAuth.error}
           v-show={this.isShowError}>
          {this.errorText}
        </p>
      </div>
    );
  }

});
