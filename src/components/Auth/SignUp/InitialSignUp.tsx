import { SignUpContext } from "@/context/SignUpContext";
import { SignUpForm } from "@/hooks/useSignUp";
import { useContext, useState } from "react";
import { Control } from "react-hook-form";
type Base = {
  control: Control<SignUpForm>;
  required: boolean;
}

interface CredentialsProps {
  base: Base
  onClick: () => void;
}

function Credentials({ base, onClick}: CredentialsProps){
  return (
    <form>
      <input {...base} name="email" placeholder="Email" />
      <input {...base} name="password" placeholder="Password" />
      <input {...base} name="username" placeholder="Username" />
      <button onClick={onClick}>Next</button>
    </form>
  )
}

function InitialSignUp(){
  const { control, handleSubmit } = useContext(SignUpContext);
  const [showForm, setShowForm] = useState(false);
  const base = {
    control: control as Control<SignUpForm>,
    required: true
  }

  const onClick = handleSubmit(() =>
    setShowForm(true)
  );

  return (
    <div>
      <Credentials base={base} onClick={onClick} />
    </div>
  )
}

export default InitialSignUp;