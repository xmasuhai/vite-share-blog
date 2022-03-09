/*
*
*
*
*
*
*
*
  oldScrollTop = 0;
  isHide = false;

  // 获取 内容区
  get contentEle() {
    return this.$refs.content;
  }

  // 头部导航做鼠标滚动优化
  scrolling() {
    // 滚动条距文档顶部的距离（做兼容处理）===》不懂的可以结合画图理清逻辑
    const scrollTop = (this.content as HTMLElement).scrollTop;
    // 滚动条滚动的距离
    const scrollStep = scrollTop - this.oldScrollTop;
    // 更新——滚动前，滚动条距文档顶部的距离
    this.oldScrollTop = scrollTop;
    // 关键 scrollStep 为正 向下 隐藏导航栏；为负 向上 显示导航栏
    scrollStep < 0
      ? this.isHide = false
      : this.isHide = true;

  }

  // 监听页面滚动事件
  mounted() {
    (this.$refs.content as HTMLElement).addEventListener('scroll', this.scrolling);
  }

*
* CSS Animation
* overflow-scrolling: touch;
*
    transition: all 0.3s; // 添加过渡，优化体验，具体可以根据需求扩展
*
*
  .home-fixed.isHide { // 这个类名用来动态改变显示藏（关键）
    transform: translateY(-100%);
  }
*
    &::-webkit-scrollbar {
      display: none;
    }
*
*
*
*
*
*
*
*
*
*
*  */
