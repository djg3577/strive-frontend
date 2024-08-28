import { SignUpForm } from "@/hooks/useSignUp";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { createContext } from "react";

type SignUpContextInitialState = {
  control: Control<SignUpForm>;
  handleSubmit: UseFormHandleSubmit<SignUpForm, SignUpForm>;
  getValues: () => Partial<SignUpForm>;
  createUser: () => Promise<void>;
  validateCode: () => Promise<void>;
};

export const SignUpContext = createContext<SignUpContextInitialState>({} as SignUpContextInitialState);
