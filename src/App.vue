<template>
  <div class="topnav">
    <a class="active">Tepisi</a>
    <a>Statistika</a>
    <a v-if="user" @click="handleClick" style="float:right">
      <span class="material-icons">
        logout
      </span>
    </a>
    <!-- <p style="padding-top:20px; color: white">{{ user?.email }}</p> -->
  </div>

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
.topnav {
  background-color: crimson;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  height: 25px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4caf50;
  color: white;
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
