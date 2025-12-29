import { createRouter, createWebHistory } from "vue-router";

import FlowscriptView from "./views/FlowscriptView.vue";

const routes = [{ component: FlowscriptView, path: "/" }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
