import 'vue-router'

declare module 'vue-router' {
  // 路由元信息
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    requiresAuth: boolean
  }
}
