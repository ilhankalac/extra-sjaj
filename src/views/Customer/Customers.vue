<template>
  <input @keyup="changeSearchValue" type="text" v-model="searchVal" placeholder="Pretraga.." />

  <div class="row">
    <div class="column">
      <div
        class="card"
        style="background-color: #fff; color:black; text-shadow: none;
      "
        @click="createNewCustomer()"
      >
        <h3>+</h3>
        <p>NOVA MUŠTERIJA</p>
      </div>
    </div>
    <div class="column" v-for="customer in customers" :key="customer.id">
      <router-link :to="{ name: 'CreateCustomer', params: { id: customer?.id } }">
        <div :class="{ card: customer?.Placeno, cardPayed: !customer?.Placeno }">
          <h3>{{ customer?.ImePrezime }}</h3>
          <p>{{ customer?.BrojTel }}</p>
          <p>
            Ima <b>{{ customer?.Carpets.length }}</b> tepiha
          </p>
          <h2>
            <b>{{ customer?.Total.toFixed(2) }} €</b>
          </h2>
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
  background-color: #58c475;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  color: white;
  text-shadow: 1px 1px black;
}
.cardPayed {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: crimson;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  color: white;
  text-shadow: 1px 1px black;
}
a {
  text-decoration: none;
  color: black;
}
</style>
