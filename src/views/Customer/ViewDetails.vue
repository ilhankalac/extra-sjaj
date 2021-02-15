<template>
  <div :class="{ 'bg-red-600 round p-5 rounded-lg text-white text-2xl': !payed, 'bg-green-500 round p-5 rounded-lg text-white text-2xl': payed }">
    <div class="container">
      <h3>
        <b>TOTAL: {{ total.toFixed(2) }} €</b> <br />
        <b v-if="!payed">Nije plaćeno</b>
        <b v-if="payed">Plaćeno</b> <br />
        <b>Br. tepiha: {{ carpetsNumber }}</b>
      </h3>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["total", "payed", "carpetsNumber"],
};
</script>

<style></style>
