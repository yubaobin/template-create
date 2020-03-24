/* 用于区分其他模块 */
const namespace = '{{ name }}'
/* 配置路经 */
const indexPath = `/${namespace}`
module.exports = [{
  path: indexPath,
  name: namespace,
  component: 'layout/index',
  redirect: `${indexPath}/index`,
  meta: { roles: ['admin'] },
  children: [{
    path: 'index',
    name: `${namespace}Index`,
    component: `views/${namespace}/index`,
    meta: { icon: 'cluster', title: '增删改查', roles: ['admin'] }
  }]
}]
