// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
// RESTful API URL
const URL = {
  get_list: '/blog',
  get_detail: '/blog/:blogId',
  create: '/blog',
  update: '/blog/:blogId',
  delete: '/blog/:blogId',
};

type blogInfo = {
  page: number,
  userId?: number,
  atIndex?: boolean
}

type blogDetail = {
  title?: string,
  content?: string,
  description?: string,
  atIndex?: boolean
}

export default {
  getBlogs({page = 1, userId, atIndex}: blogInfo = {page: 1}) {
    return request(URL.get_list, 'GET', {page, userId, atIndex});
  },
  getIndexBlogs({page = 1} = {page: 1}) {
    return this.getBlogs({page, atIndex: true});
  },
  getBlogsByUserId(userId: number, {page, atIndex}: blogInfo = {page: 1}) {
    return this.getBlogs({userId, page, atIndex});
  },
  getDetail({blogId}: { blogId: number }) {
    return request(URL.get_detail.replace(':blogId', `${blogId}`));
  },
  createBlog({title = '', content = '', description = '', atIndex = false} = {
    title: '',
    content: '',
    description: '',
    atIndex: false
  }) {
    return request(URL.update, 'POST', {title, content, description, atIndex});
  },
  updateBlog({blogId}: { blogId: number }, {title, content, description, atIndex}: blogDetail) {
    return request(URL.update.replace(':blogId', `${blogId}`),
      'PATCH',
      {title, content, description, atIndex});
  },
  deleteBlog({blogId}: { blogId: number }) {
    return request(URL.delete.replace(':blogId', `${blogId}`), 'DELETE');
  },
};

// 使用示例
// auth.register({username: hungerXx', password: '123456})
// auth.getInfo({)
// blog.createBlog({title: hungerXx', atIndex: true})
// blog.getBlogs()
// blog.getBlogsByUserId(6)
