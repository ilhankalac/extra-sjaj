<template>
  <div class="flex">
    <input class="text-4xl m-5" @keyup="changeSearchValue" type="text" v-model="search" placeholder="Pretraži..." />
    <button
      id="clear"
      @click="
        search = '';
        changeSearchValue();
      "
    >
      <span class="material-icons text-4xl">
        clear
      </span>
    </button>
  </div>

  <div v-if="!filteredCustomers?.length > 0" class="loader"></div>
  <div class="flex flex-wrap justify-center" style=" text-shadow: 1px 1px black;">
    <div class="w-72 m-2 max-w-md bg-gray-400  rounded-xl shadow-md overflow-hidden text-white md:max-w-2xl">
      <ul class="text-2xl m-3">
        <li @click="createNewCustomer()" class="flex  gap-3 hover:bg-gray-500 rounded-2xl">
          <span class="material-icons"> library_add_check </span> Nova mušterija
        </li>
        <li @click="filterDebtors()" class="flex  gap-3 hover:bg-gray-500 rounded-2xl">
          <span class="material-icons"> attach_money </span>Prikaži dužnike
        </li>
      </ul>
    </div>

    <div
      v-for="customer in filteredCustomers"
      :key="customer.id"
      :class="{
        'w-72 m-2 bg-green-500 hover:bg-green-600 rounded-xl shadow-md text-white': customer?.Placeno,
        'w-72 m-2 bg-red-500 hover:bg-red-600 rounded-xl shadow-md text-white': !customer?.Placeno,
      }"
    >
      <router-link :to="{ name: 'CreateCustomer', params: { id: customer?.id } }">
        <div>
          <div class="p-8 ">
            <p class="block mt-1 text-2xl leading-tight font-medium ">
              {{ customer?.ImePrezime }}
            </p>
            <div class="uppercase tracking-wide text-sm font-semibold">
              {{ customer?.BrojTel }}
            </div>
            <p class="mt-2 ">
              {{ dateFormat(customer?.CreationTime) }}
            </p>
            <p class="mt-2">
              Ima <b>{{ customer?.Carpets.length }}</b> tepiha
            </p>
            <hr class="m-2" />
            <p class="text-3xl">{{ customer?.Total.toFixed(2) }}€</p>
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
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
