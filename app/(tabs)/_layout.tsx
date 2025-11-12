import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeTabs, Label } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/(auth)/login"} />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Ionicons name="home" size={24} color={"#74B3C3"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Ionicons name="map" size={24} color={"#74B3C3"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Ionicons name="person" size={24} color={"#74B3C3"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="medicine">
        <Label>Medicine</Label>
        <Ionicons name="medkit" size={24} color={"#74B3C3"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        <Ionicons name="search" size={24} color={"#74B3C3"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
