<template>
  <div style="display:flex; justify-content:center; gap: 20%">
    <button style="margin-left:20px" @click="returnBack">NAZAD</button>
    <ViewDetails :total="total" />
  </div>

  <br />
  <label> Ime i prezime </label>
  <input type="text" :value="customer?.ImePrezime" ref="firstname" name="firstname" />
  <label> Broj telefona</label>
  <input type="text" :value="customer?.BrojTel" ref="phonenumber" name="firstname" />

  <label style="font-size:20px">Tepisi</label>

  <div v-for="(input, index) in customerCarpets" :key="`phoneInput-${index}`">
    <input
      @blur="makeCorrectInput(customerCarpets[index], index)"
      style="font-size:30px"
      type="text"
      v-model="customerCarpets[index]"
      placeholder="Unesi veličinu tepiha"
    />
    <!--          Add Svg Icon-->
    <svg
      @click="addField(input, customerCarpets)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="ml-2 cursor-pointer"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="green"
        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
    </svg>

    <!--          Remove Svg Icon-->
    <svg
      v-show="customerCarpets.length > 1"
      @click="removeField(index, customerCarpets)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="ml-2 cursor-pointer"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        fill="#EC4899"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
      />
    </svg>
  </div>

  <label> Napomena </label>
  <textarea ref="napomena" rows="10" :value="customer?.Napomena"></textarea>
  <br />
  <br />
  <h2 v-if="!insertCheck" style="color:crimson">Morate uneti sve podatke!</h2>
  <button style="width:90%; " @click="insertNewCustomer()">UNESI</button><br /><br />
</template>

<script>
import { projectFirestore } from "../../firebase/config";
import ViewDetails from "./ViewDetails.vue";
import getCustomer from "../../composables/getCustomer";

export default {
  props: ["id"],
  components: {
    ViewDetails,
  },
  name: "AddRemove",
  setup() {
    const { customer, error, loadCustomer } = getCustomer();
    return { customer, error, loadCustomer };
  },
  mounted() {
    if (this.id) this.loadCustomer(this.id).then((item) => (this.customerCarpets = this.customer.Carpets));
  },
  data() {
    return {
      insertCheck: true,
      customerCarpets: [{}],
      total: 0,
    };
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
      this.customerCarpets.splice(index, 1);
      this.totalQuadrature();
    },
    makeCorrectInput(value, index) {
      if (this.customerCarpets[index] !== undefined) {
        let splittedText = this.customerCarpets[index]
          .toString()
          .split(" ")
          .filter((item) => item !== "" && item !== "*" && item !== "=");
        let length = splittedText[0];
        let width = splittedText[1];

        if (length === undefined) length = 1;
        if (width === undefined) width = 1;

        let quadrature = Number(length) * Number(width);
        this.customerCarpets[index] = length + " * " + width + " = " + quadrature;
        this.totalQuadrature();
      }
    },
    totalQuadrature() {
      this.total = 0;
      this.customerCarpets.forEach((val) => {
        let currentQuadrature = val.split(" ")[val.split(" ").length - 1];
        this.total += Number(currentQuadrature);
      });
    },
    async insertNewCustomer() {
      const newCustomer = {
        ImePrezime: this.$refs.firstname.value,
        BrojTel: this.$refs.phonenumber.value,
        Napomena: this.$refs.napomena.value,
        CreationTime: Date.now(),
        Carpets: this.customerCarpets,
      };
      // CHECKING IF NAME AND TELEPHONE ARE INPUTED
      if (
        !(newCustomer.ImePrezime == null || newCustomer.ImePrezime.trim() === "") &&
        !(newCustomer.BrojTel == null || newCustomer.BrojTel.trim() === "")
      ) {
        const res = await projectFirestore.collection("customers").add(newCustomer);
        this.$router.push("/");
      } else this.insertCheck = false;
    },
  },
};
</script>

<style></style>
