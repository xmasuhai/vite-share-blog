import {getBlogByUserId, getIndexBlogs} from '@/api/blog';
import {blogFullInfo,} from '@/types/responseData';

type result = {
  blogList: blogFullInfo[] | undefined,
  totalPage: number,
  page: number
}

// 函数重载
async function invokeAPI(pageNum: number,): Promise<result>
async function invokeAPI(pageNum: number, userId: number): Promise<result>
async function invokeAPI(pageNum: number, userId?: number): Promise<result | undefined> {
  if (userId !== undefined) {
    const {
      data: blogList,
      total: totalDataCount,
      totalPage,
      page
    } = await getBlogByUserId({page: pageNum}, userId);

    return {
      blogList,
      totalPage,
      page
    };

  } else {
    const {
      data: blogList,
      total: totalDataCount,
      totalPage,
      page
    } = await getIndexBlogs({page: pageNum});

    return {
      blogList,
      totalPage,
      page
    };
  }

}

export default invokeAPI;
