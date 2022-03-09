// 接口文档见 http://dw-z.ink/2j4pC
import request from '@/helpers/request';
import {blogInfo, blogPostInfo, blogString, responseBlogDetail,} from '@/types/responseData';
// RESTful API URL
export type BlogURLType = {
  get_list: '/blog',
  get_detail: '/blog/:blogId' | `/blog/${number}`,
  create: '/blog',
  update: '/blog/:blogId' | `/blog/${number}`,
  delete: '/blog/:blogId' | `/blog/${number}`,
}

export const BlogURL: BlogURLType = {
  get_list: '/blog',
  get_detail: '/blog/:blogId',
  create: '/blog',
  update: '/blog/:blogId',
  delete: '/blog/:blogId',
};

// 原始 获取博客列表数据
export function getBlogs({page, atIndex, userId}: blogInfo = {page: 1, atIndex: true,}) {
  return request(BlogURL.get_list, 'GET', {page, atIndex, userId});
}

// 首页 全部博客数据 已分页
export function getIndexBlogs({page} = {page: 1}) {
  return getBlogs({page, atIndex: true,});
}

// 获取特定 userId 的博客列表
export function getBlogByUserId({page} = {page: 1}, userId: number,) {
  return getBlogs({page, userId});
}

export function getDetail({blogId}: { blogId: number }): Promise<responseBlogDetail> {
  return request((BlogURL.get_detail.replace(':blogId', `${blogId}`) as Exclude<blogString, '/blog'>),
    'GET');
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
  return request(BlogURL.create, 'POST', {title, content, description, atIndex});
}

export function updateBlog({blogId}: { blogId: number }, {title, content, description, atIndex}: blogPostInfo) {
  return request(((BlogURL.update as blogString).replace(':blogId', `${blogId}`) as Exclude<blogString, '/blog'>),
    'PATCH',
    {title, content, description, atIndex});
}

export function deleteBlog({blogId}: { blogId: number }) {
  return request((BlogURL.delete.replace(':blogId', `${blogId}`) as Exclude<blogString, '/blog'>),
    'DELETE');
}

// 使用示例
// auth.register({username: hungerXx', password: '123456})
// auth.getInfo({)
// blog.createBlog({title: hungerXx', atIndex: true})
// blog.getBlogs()
// blog.getBlogsByUserId(6)
