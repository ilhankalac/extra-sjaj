<template>
  <div class="h-20 bg-red-600 flex justify-between items-center ">
    <div class="space-x-5 ml-8">
      <button class="btn hover:bg-red-700 text-white text-lg font-bold">Tepisi</button>
      <button class="btn hover:bg-red-700  text-white text-lg font-bold">Statistika</button>
    </div>
    <div class="flex flex-col text-white ">
      <a class="btn text-lg font-bold  float-right cursor-pointer" v-if="user" @click="handleClick">
        <span class="material-icons">
          logout
        </span>
      </a>
      <p>{{ user?.email }}</p>
    </div>
  </div>
  <router-view />
</template>
<script>
import Customers from "./views/Customer/Customers.vue";
import useLogout from "./composables/useLogout";
import getUser from "./composables/getUser";
import { useRouter } from "vue-router";

export default {
  components: {
    Customers,
  },
  setup() {
    const { logout, error } = useLogout();
    const router = useRouter();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      router.push({ name: "LoginForm" });
    };

    return { handleClick, user };
  },
};
</script>

<style>
/* Add a color to the active/current link */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input {
  outline: none;
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
}
button {
  background-color: crimson;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 10px;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 90%;
  box-sizing: border-box;
  height: 100%;
  outline: none;
}
</style>
