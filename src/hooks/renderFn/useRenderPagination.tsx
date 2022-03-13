// 渲染分页
import blogIndex from '@/styles/blog-index.module.scss';
import {Pagination} from 'ant-design-vue';

export const useRenderPagination = (
  allPages: number,
  pageSize: number,
  currentPage: number,
  onPageChangeFn: (newPage: number) => Promise<void>
) => {
  return (
    <section class={blogIndex.pagination}
             id="pagination">
      <Pagination total={allPages}
                  pageSize={pageSize}
                  v-model:current={currentPage}
                  onChange={onPageChangeFn}/>
    </section>
  );
};
