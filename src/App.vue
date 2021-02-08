<template>
  <w-app>
    <header>
      <h1>Extra Sjaj</h1>
    </header>

    <div id="nav"></div>
    <router-view />
    <Home />
  </w-app>
</template>
<script>
import getCustomers from "./composables/getCustomers";
import Home from "./views/Home.vue";
export default {
  setup() {
    const { customers, error, load } = getCustomers();
    load();
    return { customers, error };
  },
};
</script>

<style lang="scss">
header {
  background: crimson;
  height: 100px;
}

h1 {
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f8ff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
