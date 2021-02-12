import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref("");
const logout = async () => {
  error.value = null;

  console.log("dovde");

  try {
    await projectAuth.signOut();
  } catch (error) {
    error.value = "Neuspesna odjava!";
    console.log(error);
  }
};

const useLogout = () => {
  return { logout, error };
};

export default useLogout;
