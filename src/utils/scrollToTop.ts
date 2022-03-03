/*
* window.requestAnimationFrame() 告诉浏览器希望执行一个动画，
* 并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
* 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
* requestAnimationFrame：优势：由系统决定回调函数的执行时机
* 60Hz的刷新频率，那么每次刷新的间隔中会执行一次回调函数，不会引起丢帧，不会卡顿
* */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
