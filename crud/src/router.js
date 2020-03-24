module.exports = function render (name) {
  /* 用于区分其他模块 */
  const namespace = name
  /* 模块主目录 */
  const basePath = name
  return `
  /* 配置路经 */
  module.exports = [{
    path: indexPath,
    name: namespace,
    component: 'layout/index',
    redirect: /${namespace}/index,
    meta: { roles: ['admin'] },
    children: [{
      path: 'index',
      name: ${namespace}Index,
      component: views/${basePath}/index,
      meta: { icon: 'cluster', title: '增删改查', roles: ['admin'] }
    }]
  }]
  `
}
