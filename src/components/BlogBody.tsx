import {defineComponent, onMounted, onUnmounted,} from 'vue';

// props
const BlogBodyProps = {
  isSHow: Boolean
};

export default defineComponent({
  name: 'BlogBody',
  props: BlogBodyProps,
  components: {},
  emits: ['showHeaderFooter'],
  setup(props, ctx) {
    // 获取 节点，非实时响应式
    const main = ref();

    const oldScrollTop = ref(0);

    // 按滚动方向自动显示/隐藏 回调
    const scrollingCB = () => {
      // 滚动条距文档顶部的距离（做兼容处理）
      // 注意是对象 document.documentElement 的属性 scrollTop
      // 监听 window.document 的元素 documentElement.scrollTop 属性值变化
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 滚动条滚动的距离
      const scrollStep = scrollTop - oldScrollTop.value;
      // 更新——滚动前，滚动条距文档顶部的距离
      oldScrollTop.value = scrollTop;
      // 关键 scrollStep 为正 向下 隐藏导航栏；
      // 为负 向上 显示导航栏
      scrollStep < 0
        ? (ctx.emit('showHeaderFooter', true))
        : (ctx.emit('showHeaderFooter', false));
    };

    onMounted(() => {
      window.document.addEventListener('scroll', scrollingCB);
    });

    onUnmounted(() => {
      window.document.removeEventListener('scroll', scrollingCB);
    });

    return {
      main,
    };
  },
  render() {
    return (
      <main ref={(el) => this.main = el}>
        <router-view/>
      </main>
    );
  }

});
