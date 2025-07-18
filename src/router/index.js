import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'Vorren', 
    component: () => import('../pages/Vorren.vue') },
  { 
    path: '/toposort', 
    name: 'Topo-sort', 
    component: () => import('../pages/TopoSort.vue') },
  { 
    path: '/elcalc', 
    name: 'El-calc', 
    component: () => import('../pages/ElCalc.vue')  },
  { 
    path: '/f1',
     name: 'F1', 
    component: () => import('../pages/F1.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
