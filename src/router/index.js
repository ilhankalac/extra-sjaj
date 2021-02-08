import { createRouter, createWebHistory } from "vue-router";
import Customers from "../views/Customers.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Customers,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
