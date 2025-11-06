import { signIn } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password) Alert.alert("Error", "Please fill in all fields");

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
