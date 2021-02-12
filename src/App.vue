<template>
  <header>
    <h1 style="text-align:left">Extra Sjaj</h1>
    <div class="header-section">
      <p style="padding-top:20px; color: white">{{ user?.email }}</p>
      <button v-if="user" @click="handleClick" style="border: 1px solid">
        <span class="material-icons">
          logout
        </span>
      </button>
    </div>
  </header>
  <br />
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

<style lang="scss">
h1 {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f8ff;
}
header {
  background: crimson;
  height: 140px;
  position: sticky;
  margin-top: -21px;
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  margin: 0;
  background: white;
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
  width: 90%;
  box-sizing: border-box;
  font-size: 30px;
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
