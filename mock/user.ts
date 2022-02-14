import {MockMethod} from 'vite-plugin-mock';
import Mock from 'mockjs';

const data = Mock.mock({
  'items|30': [
    {
      id: '@id',
      title: '@sentence(10, 20)',
      account: '@phone',
      true_name: '@name',
      created_at: '@datetime',
      role_name: '@name',
    },
  ],
});

export default [
  {
    url: '/api/getUser',
    method: 'get',
    response: (req: Record<string, unknown>) => {
      // console.log('req', req);

      const items = data.items;
      // console.log('body>>>>>>>>')
      return {
        code: 0, // 自定义 code
        message: 'ok',
        data: ['aa', 'bb', req], // 在axios中，用 result 代替 data
        result: {
          total: items.length,
          list: items,
        },
      };
    }
  },
] as MockMethod[];

/*
* // 代码请求
  axios.get('/api/getUser').then(res => {
      console.log(res)
})
*
*
*
*
* */
