import React from "react";
import { Input } from "./ui/input";
import { View } from "react-native";

export default function Search() {
  return (
    <View>
      <Input keyboardType="default" placeholder="Search..." />
    </View>
  );
}
