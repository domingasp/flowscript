import { createRouter, createWebHistory } from "vue-router";
import FlowscriptView from "./views/FlowscriptView.vue";

const routes = [{ path: "/", component: FlowscriptView }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
