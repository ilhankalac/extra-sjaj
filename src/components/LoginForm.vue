<template>
  <div>
    <form
      @submit.prevent="handleSubmit"
      class="mx-30 text-2xl  flex flex-col my-60 sm:mx-10 lg:mx-80 gap-10 
      shadow-2xl border-red-500 p-5 
    "
    >
      <p class="text-red-800 lg:text-4xl sm:text-2xl font-medium">Extra Sjaj - servis za pranje tepiha</p>
      <input type="email" required placeholder="Email" v-model="email" />
      <input type="password" required placeholder="Lozinka" v-model="password" />
      <div class="text-red-600 font-bold">{{ error }}</div>
      <button class="bg-red-500  hover:bg-red-600 h-16 text-white ">Prijavi se</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();
    const router = useRouter();

    const handleSubmit = async () => {
      // console.log(email.value, password.value);
      await login(email.value, password.value);

      if (!error.value) {
        // console.log("Korisnik je uspjesno prijavljen!");
        router.push({ name: "Customer" });
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style></style>
