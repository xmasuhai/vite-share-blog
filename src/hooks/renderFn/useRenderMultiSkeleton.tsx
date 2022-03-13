import MultiSkeleton from '@/components/user-authentication/MultiSkeleton';
import {blogUserType, onDeleteFnType} from '@/hooks/renderFn/render';
import SkeletonAvatarProps from 'ant-design-vue';
import SkeletonParagraphProps from 'ant-design-vue';
import SkeletonTitleProps from 'ant-design-vue';

// 渲染骨架屏
export const useRenderMultiSkeleton = (
  isLoading: boolean,
  blogUser: blogUserType,
  onDelete: onDeleteFnType,
  hasAvatar?: boolean | typeof SkeletonAvatarProps,
  hasParagraph?: boolean | typeof SkeletonParagraphProps,
  hasTitle?: boolean | typeof SkeletonTitleProps,
) => {
  return (
    <MultiSkeleton isLoading={isLoading}
                   blogUser={blogUser}
                   onDelete={onDelete}
                   hasAvatar={hasAvatar || false}
                   hasParagraph={hasParagraph || true}
                   hasTitle={hasTitle || true}/>
  );
};
