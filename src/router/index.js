import { createRouter, createWebHistory } from 'vue-router'
import Vorren from '../pages/Vorren.vue'
import TopoSort from '../pages/TopoSort.vue'
import ElCalc from '../pages/ElCalc.vue'
import F1 from '../pages/F1.vue'

const routes = [
  { path: '/', name: 'Vorren', component: Vorren },
  { path: '/toposort', name: 'Topo-sort', component: TopoSort },
  { path: '/elcalc', name: 'El-calc', component: ElCalc },
  { path: '/f1', name: 'F1', component: F1 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
