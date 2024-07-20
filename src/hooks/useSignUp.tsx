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
  const initialState = {
    step: 1,
    loading: false,
  };

  const reducer = (state: typeof initialState, action: { type: string; payload: any }) => {
    switch (action.type) {
      case "SET_ROLE":
        return { ...state, role: action.payload };
      case "NEXT_STEP":
        return { ...state, step: state.step + 1 };
      case "PREV_STEP":
        return { ...state, step: state.step - 1 };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, loading } = state;

  const { control, handleSubmit, getValues } = useForm<SignUpForm>();

  const createUser = handleSubmit(async (data: SignUpForm) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await Auth.signUp(data);
      dispatch({ type: "SET_LOADING", payload: null });
    } catch (e: any) {
      const { message } = e.response.data;
      console.log(message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  });

  const validateCode = handleSubmit(async (data: SignUpForm) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const { code } = data;
      await Auth.validateCode(code);
      dispatch({ type: "SET_LOADING", payload: null });
    } catch (e: any) {
      const { message } = e.response.data;
      console.log(message);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  });

  const { Provider } = SignUpContext;

  return {
    control,
    step,
    loading,
    handleSubmit,
    getValues,
    createUser,
    validateCode,
    Provider,
  };
}

export default useSignUp;
