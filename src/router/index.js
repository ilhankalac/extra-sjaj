import { createRouter, createWebHistory } from "vue-router";
import Customers from "../views/Customer/Customers.vue";
import CreateCustomer from "../views/Customer/CreateCustomer.vue";
import LoginForm from "../components/LoginForm.vue";
import { projectAuth } from "../firebase/config";

// auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  console.log("Current user in guard", user);
  if (!user) next({ name: "LoginForm" });
  next();
};

const routes = [
  {
    path: "/",
    name: "Customer",
    component: Customers,
    beforeEnter: requireAuth,
  },
  {
    path: "/musterija-:id?",
    name: "CreateCustomer",
    component: CreateCustomer,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/registracija",
    name: "LoginForm",
    component: LoginForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
