import {defineComponent,} from 'vue';
import cssAuth from '@/styles/auth.module.scss';
import {Input} from 'ant-design-vue';

const UserInputProps = {
  title: String,
  inputType: {type: String, default: ''},
  placeholder: String,
  errorText: String,
  doubleBind: String
};

export default defineComponent({
  name: 'UserInput',
  props: UserInputProps,
  components: {},
  setup(/*props, ctx*/) {

    return {};
  },
  render() {
    return (
      <>
        <label for={this.title}>
          <h4 class={cssAuth.password}>
            {this.title}
          </h4>
          <Input v-model={this.doubleBind}
                 type={this.inputType}
                 placeholder={this.placeholder ?? this.title}
                 id={this.title}
                 class={cssAuth.userInput}/>
        </label>
        <p class={cssAuth.error}>
          {this.errorText}
        </p>
      </>
    );
  }

});
