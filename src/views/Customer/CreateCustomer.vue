<template>
  <button @click="returnBack">NAZAD</button> <br />
  <label> Ime i prezime</label>
  <input type="text" ref="firstname" name="firstname" />
  <label> Broj telefona</label>
  <input type="text" ref="phonenumber" name="firstname" />
  <label> Napomena</label>
  <textarea ref="napomena" rows="10"></textarea>
  <br />
  <br />
  <h2 v-if="!insertCheck" style="color:crimson">Morate uneti sve podatke!</h2>
  <button style="width:90%; " @click="insertNewCustomer()">UNESI</button>
</template>

<script>
import { projectFirestore } from "../../firebase/config";
export default {
  data() {
    return {
      insertCheck: true,
    };
  },
  methods: {
    returnBack() {
      this.$router.go(-1);
    },
    async insertNewCustomer() {
      const newCustomer = {
        ImePrezime: this.$refs.firstname.value,
        BrojTel: this.$refs.phonenumber.value,
        Napomena: this.$refs.napomena.value,
        CreationTime: Date.now(),
      };
      // CHECKING IF NAME AND TELEPHONE ARE INPUTED
      if (
        !(newCustomer.ImePrezime == null || newCustomer.ImePrezime.trim() === "") &&
        !(newCustomer.BrojTel == null || newCustomer.BrojTel.trim() === "")
      ) {
        const res = await projectFirestore.collection("customers").add(newCustomer);
        this.$router.push("/");
        this.insertCheck = true;
      } else this.insertCheck = false;
    },
  },
};
</script>

<style></style>
