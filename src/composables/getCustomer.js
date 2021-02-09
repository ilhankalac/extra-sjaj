import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getCustomer = () => {
  const customer = ref([]);
  const error = ref(null);

  const loadCustomer = async (id) => {
    try {
      let res = await projectFirestore
        .collection("customers")
        .doc(id)
        .get();

      customer.value = { ...res.data(), id: res.id };
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { customer, error, loadCustomer };
};

export default getCustomer;
