<template>
  <div class="flex justify-between m-3">
    <button class="bg-red-600 hover:bg-red-700  w-20" @click="returnBack">
      <span class="material-icons">
        arrow_back
      </span>
    </button>
    <ViewDetails
      class="cursor-pointer"
      :total="total"
      :payed="customerObj?.Placeno"
      :carpetsNumber="customerObj?.Carpets.length"
      @click="changePayedStatus()"
    />
  </div>
  <div class="lg:mx-64 lg:text-4xl sm:text-2xl sm:mx-10">
    <label> Ime i prezime </label>
    <input type="text" v-model="customerObj.ImePrezime" />
    <label> Broj telefona</label>
    <input type="text" v-model="customerObj.BrojTel" />

    <label style="font-size:20px">Tepisi</label>
    <div v-if="!customer?.Carpets && id" class="loader"></div>
    <div v-for="(input, index) in customerObj?.Carpets" :key="`phoneInput-${index}`" style="display:flex">
      <input
        @blur="makeCorrectInput(customerObj.Carpets[index], index)"
        type="text"
        v-model="customerObj.Carpets[index]"
        placeholder="Unesi veličinu tepiha"
        :disabled="customerObj?.Placeno"
      />
      <!--          Add Svg Icon-->
      <svg
        v-if="!customerObj?.Placeno"
        @click="addField(customerObj.Carpets)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="100"
        height="100"
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
        v-show="customerObj.Carpets.length > 1"
        v-if="!customerObj?.Placeno"
        @click="removeField(index)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="50"
        height="50"
        class="ml-2 cursor-pointer"
        style="margin-top:3%"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="#EC4899"
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
        />
      </svg>
    </div>

    <label> Napomena </label>
    <textarea ref="napomena" rows="2" v-model="customerObj.Napomena"></textarea>
    <h2 v-if="!insertCheck" style="color:crimson">Morate uneti sve podatke!</h2>
    <button v-if="!customerObj?.Placeno" class="bg-red-600 hover:bg-red-700  w-48 h-14 text-white font-bold" @click="changeNewCustomer()">
      <span v-if="id">PROMENI</span>
      <span v-if="!id">UNESI</span>
    </button>
  </div>
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
    if (this.id) this.loadCustomer(this.id).then((item) => (this.customerObj = this.customer));
    setInterval(() => {
      this.totalQuadrature();
    }, 50);
  },
  data() {
    return {
      insertCheck: true,
      total: 0,
      test: false,
      customerObj: {
        Carpets: [""],
        ImePrezime: "",
        BrojTel: "",
        Napomena: "",
        Placeno: false,
      },
    };
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
    addField(fieldType) {
      fieldType.push("");
    },
    removeField(index) {
      if (confirm("Da li si siguran da želiš da brišeš odabrani tepih?")) {
        this.customerObj.Carpets.splice(index, 1);
        this.totalQuadrature();
      }
    },
    makeCorrectInput(value, index) {
      if (this.customerObj.Carpets[index] !== undefined) {
        let splittedText = this.customerObj.Carpets[index]
          .toString()
          .split(" ")
          .filter((item) => item !== "" && item !== "*" && item !== "=");

        let length = splittedText[0];
        let width = splittedText[1];

        if (length === undefined) length = 1;
        if (width === undefined) width = 1;

        let quadrature = Number(length) * Number(width);
        this.customerObj.Carpets[index] = length + " * " + width + " = " + quadrature.toFixed(2);
        this.totalQuadrature();
      }
    },
    totalQuadrature() {
      this.total = 0;
      let currentQuadrature = 0;
      this.customerObj.Carpets.forEach((item) => {
        if (item !== "") {
          currentQuadrature = item.split(" ")[item.split(" ").length - 1];
          this.total += Number(currentQuadrature);
        }
      });
    },
    async changePayedStatus() {
      if (confirm("Da li si siguran da je mušterija platio? (odnosno suprotno)")) {
        this.customerObj.Placeno = !this.customerObj.Placeno;
        await this.changeNewCustomer(true);
      }
    },
    async changeNewCustomer(changedPayedStatus = false) {
      const fireStoreCustomerObj = {
        ImePrezime: this.customerObj.ImePrezime,
        BrojTel: this.customerObj.BrojTel,
        Napomena: this.customerObj.Napomena,
        CreationTime: this.customerObj.CreationTime,
        LatestUpdate: null,
        Carpets: this.customerObj.Carpets.filter((item) => item !== ""),
        Placeno: this.customerObj.Placeno,
        Total: this.total,
      };
      // CHECKING IF NAME AND TELEPHONE ARE INPUTED
      if (
        !(fireStoreCustomerObj.ImePrezime == null || fireStoreCustomerObj.ImePrezime.trim() === "") &&
        !(fireStoreCustomerObj.BrojTel == null || fireStoreCustomerObj.BrojTel.trim() === "")
      ) {
        if (!this.id) {
          // ADD THE SINGLE DOCUMENT
          fireStoreCustomerObj.CreationTime = Date.now();
          const res = await projectFirestore.collection("customers").add(fireStoreCustomerObj);
        } else {
          // UPDATE THE SINGLE DOCUMENT
          fireStoreCustomerObj.LatestUpdate = Date.now();
          const res = await projectFirestore
            .collection("customers")
            .doc(this.id)
            .update(fireStoreCustomerObj);
        }
        // STAYING IN THE SAME COMPONENT IF USER ONLY UPDATE PAYMENT STATUS
        if (!changedPayedStatus) this.$router.push("/");
      } else this.insertCheck = false;
    },
  },
};
</script>

<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid crimson;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
