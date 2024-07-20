import SignUpContent from "@/components/Auth/SignUp/SignUpContent";
import useSignUp from "@/hooks/useSignUp";

function SignUp() {
  const { control, step, Provider, handleSubmit, getValues, createUser, validateCode, loading } = useSignUp();

  return (
    <Provider value={{ control, createUser, step, loading, handleSubmit, getValues, validateCode }}>
      <SignUpContent />
    </Provider>
  );
}

export default SignUp;
