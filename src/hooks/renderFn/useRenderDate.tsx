// 渲染文章 - 日期
import cssUser from '@/styles/blog-user.module.scss';
import classNames from 'classnames';

export const useRenderDate = (date: number, month: number, year: number) => {
  return (
    <div class={cssUser.date}>
                <span class={classNames([cssUser.day, cssUser.dateItem])}>
                  {date}
                  </span>
      <span class={cssUser.dateItem}>
                {month}
                </span>
      <span class={cssUser.dateItem}>
                {year}
                </span>
    </div>
  );
};
