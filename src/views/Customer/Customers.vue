<template>
  <div>
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

  <div v-if="!filteredCustomers?.length > 0" class="loader"></div>
  <div class="flex flex-wrap justify-center">
    <div
      class="w-72 m-3 max-w-md bg-gray-400  hover:bg-gray-500 rounded-xl shadow-md overflow-hidden text-white md:max-w-2xl "
      @click="createNewCustomer()"
    >
      <div class="p-8 ">
        <h3>
          <span class="material-icons">
            library_add_check
          </span>
        </h3>
        <p class="m-y-50">NOVA MUŠTERIJA</p>
      </div>
    </div>
    <div class="w-72 m-3 bg-green-300 hover:bg-green-500 rounded-xl shadow-md text-white" v-for="customer in filteredCustomers" :key="customer.id">
      <router-link :to="{ name: 'CreateCustomer', params: { id: customer?.id } }">
        <div>
          <div class="p-8 ">
            <div class="uppercase tracking-wide text-sm font-semibold">{{ customer?.ImePrezime }}</div>
            <p class="block text-white mt-1 text-lg leading-tight font-medium">{{ dateFormat(customer?.CreationTime) }}</p>
            <p class="mt-2 text-gray-500">
              {{ customer?.BrojTel }}
            </p>
            <p class="mt-2 text-gray-500">
              Ima <b>{{ customer?.Carpets.length }}</b> tepiha
            </p>
          </div>
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

a {
  text-decoration: none;
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
