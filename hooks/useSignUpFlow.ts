import { useState } from "react";
import { useAuth } from "./useAuth";
import { useForm } from "react-hook-form";
import {
  CredentialsForm,
  credentialsSchema,
  DateOfBirthForm,
  dateOfBirthSchema,
  PersonalInfoForm,
  personalInfoSchema,
} from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

type SignUpStep = "Personal" | "Date of Birth" | "Credentials";

export function useSignUpFlow() {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("Personal");
  const [formData, setFormData] = useState<
    Partial<PersonalInfoForm & DateOfBirthForm & CredentialsForm>
  >({});
  const { signUp, isSigningUp, signUpError } = useAuth();

  const personalForm = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData?.firstName || "",
      lastName: formData?.lastName || "",
    },
  });

  const dateOfBirthForm = useForm<DateOfBirthForm>({
    resolver: zodResolver(dateOfBirthSchema),
    defaultValues: {
      dateOfBirth: formData?.dateOfBirth || "",
    },
  });

  const credentialsForm = useForm<CredentialsForm>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: {
      email: formData.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlePersonalSubmit = (data: PersonalInfoForm) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep("Date of Birth");
  };

  const handleDobSubmit = (data: DateOfBirthForm) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep("Credentials");
  };

  const handleCredentialsSubmit = (data: CredentialsForm) => {
    const completeData = { ...formData, ...data };

    const { confirmPassword, ...signUpData } = completeData;
    signUp({
      email: signUpData.email!,
      password: signUpData.password!,
      firstName: signUpData.firstName!,
      lastName: signUpData.lastName!,
      dateOfBirth: signUpData.dateOfBirth!,
    });
  };

  const backButton = () => {
    if (currentStep === "Date of Birth") {
      setCurrentStep("Personal");
    } else if (currentStep === "Credentials") {
      setCurrentStep("Date of Birth");
    }
  };

  const resetFlow = () => {
    setCurrentStep("Personal");
    setFormData({});
    personalForm.reset();
    dateOfBirthForm.reset();
    credentialsForm.reset();
  };

  return {
    currentStep,
    personalForm,
    dateOfBirthForm,
    credentialsForm,
    handlePersonalSubmit,
    handleDobSubmit,
    handleCredentialsSubmit,
    isSigningUp,
    signUpError,
    backButton,
    resetFlow,
    canGoBack: currentStep !== "Personal",
    canGoNext: currentStep !== "Credentials",
  };
}
