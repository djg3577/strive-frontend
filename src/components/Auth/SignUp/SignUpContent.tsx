import { SignUpContext } from "@/context/SignUpContext";
import { useContext } from "react";
import InitialSignUp from "./InitialSignUp";

function SignUpContent() {
  const { step } = useContext(SignUpContext);

  return <>{step === 1 && <InitialSignUp />}</>;
}

export default SignUpContent;
