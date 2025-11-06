import { createUser } from "@/lib/appwrite";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function Signup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const submit = async () => {
    const { email, password, firstName, lastName, dateOfBirth } = form;

    if (!email || !password || !firstName || !lastName || !dateOfBirth)
      Alert.alert("Error", "Please fill in all fields");

    setIsSubmitting(true);

    try {
      await createUser({ email, password, firstName, lastName, dateOfBirth });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <Text>Signup</Text>
    </View>
  );
}
