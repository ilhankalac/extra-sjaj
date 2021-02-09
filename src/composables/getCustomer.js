import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getCustomers = () => {
  const customers = ref([]);
  const error = ref(null);

  const load = async (id) => {
    try {
      // TAKING THE ORDERED DATA
      const res = await projectFirestore
        .collection("customers")
        .orderBy("CreationTime", "desc")
        .get();
      customers.value = res.docs.map((doc) => {
        // console.log(doc.data());
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };
  return { customers, error, load };
};

export default getCustomers;
