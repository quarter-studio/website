export default () => {
  return [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/pages/home/Home.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/pages/errors/404.vue')
    }
  ]
}