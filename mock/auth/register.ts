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
    url: '/auth/register',
    method: 'post',
    response: (req: Record<string, unknown> ) => {
      const items = data.items;
      // console.log('body>>>>>>>>')
      return {
        code: 0, // 自定义 code
        message: 'ok',
        data: [req], // 在axios中，用 result 代替 data
        result: {
          total: items.length,
          list: items,
        },
      };
    }
  },
] as MockMethod[];
