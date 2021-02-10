<template>
  <input @keyup="changeSearchValue" type="text" v-model="searchVal" placeholder="Pretraga.." />

  <div class="row">
    <div class="column">
      <div class="card" style="background-color: #fff" @click="createNewCustomer()">
        <h3>+</h3>
        <p>NOVI MUŠTERIJA</p>
      </div>
    </div>
    <div class="column" v-for="customer in customers" :key="customer.id">
      <router-link :to="{ name: 'CreateCustomer', params: { id: customer?.id } }">
        <div class="card">
          <h3>{{ customer?.ImePrezime }}</h3>
          <p>{{ customer?.BrojTel }}</p>
          <p>
            <b>{{ customer?.Total.toFixed(2) }} €</b>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import getCustomers from "../../composables/getCustomers";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {},
  methods: {
    createNewCustomer() {
      this.$router.push({ name: "CreateCustomer" });
    },
  },
  setup() {
    const store = useStore();
    const searchVal = store.getters.getSearchVal;

    // REMEMBERING THE SEARCH INPUT IF USER DESTROY THIS COMPONENT
    function changeSearchValue() {
      store.commit("changeSearchValue", this.searchVal);
    }

    const { customers, error, load } = getCustomers();
    load();

    return { customers, error, searchVal, changeSearchValue };
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

.row {
  margin: 10px 18px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
  cursor: pointer;
  margin-top: 20px;
}
a {
  text-decoration: none;
  color: black;
}
</style>
