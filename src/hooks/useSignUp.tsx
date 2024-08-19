import { SignUpContext } from "@/context/SignUpContext";
import Auth from "@/store/auth";
import { useReducer } from "react";
import { useForm } from "react-hook-form";

export type SignUpForm = {
  email: string;
  password: string;
  username: string;
  code: string;
};

/**
 * Custom hook for sign up functionality.
 *
 * @returns An object containing the current role, step, select function, createUser function, control object, and Provider component.
 */
function useSignUp() {


  const { control, handleSubmit, getValues } = useForm<SignUpForm>();

  const createUser = handleSubmit(async (data: SignUpForm) => {
    try {
      await Auth.signUp(data);
    } catch (e: any) {
      const { message } = e.response.data;
      console.log(message);
    } 
  });

  const validateCode = handleSubmit(async (data: SignUpForm) => {
    try {
      const { code } = data;
      await Auth.validateCode(code);
    } catch (e: any) {
      const { message } = e.response.data;
      console.log(message);
    }
  });

  const { Provider } = SignUpContext;

  return {
    control,
    handleSubmit,
    getValues,
    createUser,
    validateCode,
    Provider,
  };
}

export default useSignUp;
