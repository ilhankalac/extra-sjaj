<template>
  <header>
    <h1>Extra Sjaj</h1>
  </header>

  <div style="display:inline">
    <input style="display: inline" type="text" id="fname" name="firstname" placeholder="Pretraga.." />

    <button style="display: inline" class="button">Novi</button>
  </div>

  <router-view />
</template>
<script>
import Customers from "./views/Customers.vue";
export default {
  components: {
    Customers,
  },
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
  position: sticky;
  margin-top: -21px;
}
.button {
  background-color: crimson; /* Green */
  border: none;
  color: #f8f8ff;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
input {
  width: 50%;
  padding: 20px;
  margin-top: 30px;
  margin-right: 5%;
  border-radius: 4px;
  border-color: crimson;
  font-size: larger;
  cursor: pointer;
  margin-bottom: 10px;
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
</style>
