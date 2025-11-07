import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { SignInForm, signInSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Link } from "expo-router";

export default function Login() {
  const { signIn, isSigningIn, signInError } = useAuth();
  const { control, handleSubmit } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInForm) => {
    signIn(data);
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 p-6"
          contentContainerStyle={{ paddingVertical: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="py-6">
            <Text className="text-3xl font-bold"></Text>
            <Text className="text-muted-foreground mt-2">
              Sign in to continue
            </Text>
          </View>

          <View className="gap-4 mt-8">
            <FormInput
              control={control}
              name="email"
              label="Email"
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              autoComplete="email"
            />
            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              autoComplete="password"
            />

            {signInError && (
              <View className="bg-destructive/10 p-3 rounded-lg">
                <Text className="text-destructive text-sm">
                  {signInError.message}
                </Text>
              </View>
            )}

            <Button
              onPress={handleSubmit(onSubmit)}
              className="mt-4"
              disabled={isSigningIn}
            >
              <Text>{isSigningIn ? "Signing in..." : "Sign in"}</Text>
            </Button>

            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-muted-foreground">
                Don&apos;t have an account?{" "}
              </Text>
              <Link href={"/(auth)/signup"} asChild>
                <Button variant={"link"} className="p-0">
                  <Text className="text-primary font-semibold">Sign Up</Text>
                </Button>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
