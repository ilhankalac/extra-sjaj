<template>
  <div class="row">
    <div class="column" v-for="customer in customers" :key="customer.id">
      <div class="card">
        <h3>{{ customer?.ImePrezime }}</h3>
        <p>{{ customer?.BrojTel }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import getCustomers from "../composables/getCustomers";

export default {
  name: "Home",
  components: {},
  setup() {
    const { customers, error, load } = getCustomers();
    load();
    return { customers, error };
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

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding */
.row {
  margin: 10px 10px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}
</style>
