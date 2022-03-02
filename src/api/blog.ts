// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {blogInfo, blogPostInfo, responseBlogDetail,} from '@/types/responseData';
// RESTful API URL
const URL = {
  get_list: '/blog',
  get_detail: '/blog/:blogId',
  create: '/blog',
  update: '/blog/:blogId',
  delete: '/blog/:blogId',
};

export function getBlogs({page, atIndex, userId}: blogInfo = {page: 1, atIndex: true,}) {
  return request(URL.get_list, 'GET', {page, atIndex, userId});
}

// 首页 全部博客数据 已分页
export function getIndexBlogs({page} = {page: 1}) {
  return getBlogs({page, atIndex: true,});
}

// 获取特定 userId 的博客列表
export function getBlogByUserId(userId: number, {page} = {page: 1}) {
  return getBlogs({page, atIndex: true, userId});
}

export function getDetail({blogId}: { blogId: number }) {
  return request(URL.get_detail.replace(':blogId', `${blogId}`));
}

export function createBlog({
  title,
  content,
  description,
  atIndex
} = {
  title: '',
  content: '',
  description: '',
  atIndex: false
}): Promise<responseBlogDetail> {
  return request(URL.create, 'POST', {title, content, description, atIndex});
}

export function updateBlog({blogId}: { blogId: number }, {title, content, description, atIndex}: blogPostInfo) {
  return request(URL.update.replace(':blogId', `${blogId}`),
    'PATCH',
    {title, content, description, atIndex});
}

export function deleteBlog({blogId}: { blogId: number }) {
  return request(URL.delete.replace(':blogId', `${blogId}`), 'DELETE');
}

// 使用示例
// auth.register({username: hungerXx', password: '123456})
// auth.getInfo({)
// blog.createBlog({title: hungerXx', atIndex: true})
// blog.getBlogs()
// blog.getBlogsByUserId(6)
