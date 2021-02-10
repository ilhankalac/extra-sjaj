<template>
  <div :class="{ card: !payed, notpayed: payed }">
    <div class="container">
      <h3>
        <b>TOTAL: {{ total.toFixed(2) }} EUR</b> <br />
        <b v-if="!payed">Nije plaćeno</b>
        <b v-if="payed">Plaćeno</b>
      </h3>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["total", "payed"],
};
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background: crimson;
  color: #f8f8ff;
  border-radius: 10px;
  width: 250px;
  margin-right: 20px;
}

.notpayed {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background: green;
  color: #f8f8ff;
  border-radius: 10px;
  width: 250px;
  margin-right: 20px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>
