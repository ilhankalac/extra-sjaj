import { createRouter, createWebHistory } from "vue-router";
import Customers from "../views/Customer/Customers.vue";
import CreateCustomer from "../views/Customer/CreateCustomer.vue";

const routes = [
  {
    path: "/",
    name: "Customer",
    component: Customers,
  },
  {
    path: "/novi-korisnik",
    name: "CreateCustomer",
    component: CreateCustomer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
