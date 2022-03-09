import {responseGetBlogsData} from '@/types/responseData';

export default interface BolgModuleTypes {
  total: number, // 全部博客的总数
  page: number, // 当前页数
  totalPage: number, // 总页数
  userData: responseGetBlogsData['data'] | responseGetBlogsData['data'][] | null,
}
