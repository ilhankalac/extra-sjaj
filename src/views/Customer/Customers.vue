<template>
  <div class="buttonIn">
    <input @keyup="changeSearchValue" type="text" v-model="search" placeholder="Pretraži..." />
    <button
      id="clear"
      @click="
        search = '';
        changeSearchValue();
      "
    >
      <span class="material-icons">
        clear
      </span>
    </button>
    <span style="font-size:50px; cursor:pointer" class="material-icons">
      manage_search
    </span>
  </div>

  <div class="row">
    <div v-if="!filteredCustomers?.length > 0" class="loader"></div>

    <div class="column">
      <div
        class="card"
        style="background-color: #fff; color:black; text-shadow: none;
      "
        @click="createNewCustomer()"
      >
        <h3>
          <span class="material-icons">
            library_add_check
          </span>
        </h3>
        <p>NOVA MUŠTERIJA</p>
      </div>
    </div>
    <div class="column" v-for="customer in filteredCustomers" :key="customer.id">
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
          <p>{{ dateFormat(customer?.CreationTime) }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import getCustomers from "../../composables/getCustomers";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "Home",
  components: {},
  methods: {
    createNewCustomer() {
      this.$router.push({ name: "CreateCustomer" });
    },

    dateFormat(date) {
      let formatedDate = new Date(date).toString();
      return formatedDate.substring(4, 21);
    },
  },
  setup() {
    const store = useStore();
    const searchValStore = store.getters.getSearchVal;
    const search = ref(searchValStore);

    // REMEMBERING THE SEARCH INPUT IF USER DESTROY THIS COMPONENT
    function changeSearchValue() {
      store.commit("changeSearchValue", search.value);
    }

    const { customers, error, load } = getCustomers();
    load();

    // FILTERING THE CUSTOMERS BY THE SEARCH VALUE
    const filteredCustomers = computed(() => {
      let searchToLowerCase = search.value.toLowerCase();
      return customers.value.filter(
        (item) =>
          item.ImePrezime.toLowerCase().includes(searchToLowerCase) ||
          item.BrojTel.toLowerCase().includes(searchToLowerCase) ||
          item.Total.toString().includes(searchToLowerCase) ||
          new Date(item.CreationTime)
            .toString()
            .toLowerCase()
            .includes(searchToLowerCase)
      );
    });

    return { customers, error, searchValStore, changeSearchValue, filteredCustomers, search };
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
.buttonIn {
  display: flex;
  gap: 5px;
  margin: 2%;
}

.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}
</style>
