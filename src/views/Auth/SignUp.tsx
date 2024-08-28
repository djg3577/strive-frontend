import InitialSignUp from "@/components/Auth/SignUp/InitialSignUp";
import useSignUp from "@/hooks/useSignUp";

function SignUp() {
  const { control, Provider, handleSubmit, getValues, createUser, validateCode } = useSignUp();

  return (
    <Provider value={{ control, createUser, handleSubmit, getValues, validateCode }}>
      <InitialSignUp />
    </Provider>
  );
}

export default SignUp;
