<template>
  <header>
    <h1>Extra Sjaj</h1>
  </header>
  <input type="text" id="fname" name="firstname" placeholder="Pretraga.." />

  <div id="nav"></div>
  <router-view />
  <Home />
</template>
<script>
import getCustomers from "./composables/getCustomers";
export default {
  // setup() {
  //   const { customers, error, load } = getCustomers();
  //   load();
  //   return { customers, error };
  // },
};
</script>

<style lang="scss">
header {
  background: crimson;
  height: 100px;
  margin: -22px;
}
input {
  width: 90%;
  padding: 20px;
  margin-top: 30px;
  border-radius: 4px;
  border-color: crimson;
  font-size: larger;
  cursor: pointer;
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
body {
  background: white;
}
</style>
