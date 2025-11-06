import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSignUpFlow } from "@/hooks/useSignUpFlow";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const {
    currentStep,
    personalForm,
    dateOfBirthForm,
    credentialsForm,
    handlePersonalSubmit,
    handleDobSubmit,
    handleCredentialsSubmit,
    backButton,
    isSigningUp,
    signUpError,
  } = useSignUpFlow();

  const progress =
    currentStep === "Personal"
      ? 33
      : currentStep === "Date of Birth"
        ? 66
        : 100;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="py-6">
            <Text className="text-3xl font-bold">Create Account</Text>
            <Text className="text-muted-foreground mt-2">
              {currentStep === "Personal" && "Let's start with your name"}
              {currentStep === "Date of Birth" && "When is your birthday?"}
              {currentStep === "Credentials" && "Set up your account"}
            </Text>
          </View>

          <View className="mb-8">
            <Progress value={progress} className="h-2" />
            <Text className="text-sm text-muted-foreground mt-2">
              Step{" "}
              {currentStep === "Personal"
                ? 1
                : currentStep === "Date of Birth"
                  ? 2
                  : 3}
            </Text>
          </View>

          {currentStep === "Personal" && (
            <View className="gap-4">
              <FormInput
                control={personalForm.control}
                name="firstName"
                label="First Name"
                placeholder="Jepoy"
                autoCapitalize="words"
                autoComplete={"given-name"}
              />
              <FormInput
                control={personalForm.control}
                name="lastName"
                label="Last Name"
                placeholder="Hidalgo"
                autoCapitalize="words"
                autoComplete={"family-name"}
              />
              <Button
                onPress={personalForm.handleSubmit(handlePersonalSubmit)}
                className="mt-4"
              >
                <Text>Continue</Text>
              </Button>
            </View>
          )}

          {currentStep === "Date of Birth" && (
            <View className="gap-4">
              <FormInput
                control={dateOfBirthForm.control}
                name="dateOfBirth"
                label="Date of Birth"
                keyboardType="numeric"
              />
              <Text className="text- sm text-muted-foreground">
                You must be at least 18 years old to use Pharmafetch
              </Text>
              <View className="flex-row gap-3 mt-3">
                <Button
                  onPress={backButton}
                  variant={"outline"}
                  className="flex-1"
                >
                  <Text>Back</Text>
                </Button>
                <Button
                  onPress={dateOfBirthForm.handleSubmit(handleDobSubmit)}
                  className="flex-1"
                >
                  <Text>Continue</Text>
                </Button>
              </View>
            </View>
          )}

          {currentStep === "Credentials" && (
            <View className="gap-4">
              <FormInput
                control={credentialsForm.control}
                name="email"
                label="Email"
                placeholder="poyhidalgo@example.com"
                keyboardType="email-address"
                autoComplete="email"
              />
              <FormInput
                control={credentialsForm.control}
                name="password"
                label="Password"
                secureTextEntry
                autoComplete="password-new"
              />
              <FormInput
                control={credentialsForm.control}
                name="confirmPassword"
                label="Confirm Password"
                secureTextEntry
                autoComplete="password-new"
              />
              <Text className="text-xs text-muted-foreground">
                Password must at least 8 characters long.
              </Text>

              {signUpError && (
                <View className="bg-destructive/10 p-3 rounded-lg">
                  <Text className="text-destructive text-sm">
                    {signUpError.message}
                  </Text>
                </View>
              )}

              <View className="flex-row gap-3 mt-4">
                <Button
                  onPress={backButton}
                  variant={"outline"}
                  className="flex-1"
                  disabled={isSigningUp}
                >
                  <Text>Back</Text>
                </Button>
                <Button
                  onPress={credentialsForm.handleSubmit(
                    handleCredentialsSubmit,
                  )}
                  className="flex-1"
                  disabled={isSigningUp}
                >
                  <Text>{isSigningUp ? "Signing Up..." : "Sign Up"}</Text>
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
