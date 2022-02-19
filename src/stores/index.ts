import {defineStore} from 'pinia';

// 定义 stores 名为 myFirstStore 是 stores 的名称，该名称必须唯一，不可重复
export const useStore = defineStore('myFirstStore', {
  state: () => { // 必须用箭头函数代替函数声明，否则调用 state 时 失去类型
    return {
      count: 0,
      name: 'foo',
      list: [1, 2, 3],
      showLoginRegister: false
    };
  },
  getters: {
    countPlusOne(state): number {
      // console.log('------countPlusOne------')
      return state.count + 1;
    }
  },
  actions: {
    ifLoginPage() {
      this.showLoginRegister = true;
    },
    ifNotLoginPage() {
      this.showLoginRegister = false;
    },
    async changeName() {
      /*
      const newName: string = await new Promise((resolve/!*, reject*!/) => {
        setTimeout(() => {
          resolve('newName');
        }, 1000);
      })
      .catch(err => {});

      this.name = newName;
      */
    }

  }

});
