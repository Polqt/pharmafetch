import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";
import React from "react";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/(auth)/login"} />;

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Label>Home</Label>
        <Icon sf={{ default: "house", selected: "house.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="map">
        <Label>Map</Label>
        <Icon sf={{ default: "map", selected: "map.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon sf={{ default: "person", selected: "person.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="medicine">
        <Label>Medicine</Label>
        <Icon sf={{ default: "pill", selected: "pill.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <Label>Search</Label>
        <Icon
          sf={{
            default: "magnifyingglass.circle",
            selected: "magnifyingglass.circle.fill",
          }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
