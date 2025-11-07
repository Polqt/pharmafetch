import { useAuthStore } from "@/store/authStore";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: string;
  title: string;
}) => {
  if (focused) {
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full"></View>
    );
  }
};

export default function TabsLayout() {
  const isAuthenticated = useAuthStore();

  if (!isAuthenticated) return <Redirect href={"/(auth)/login"} />;
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" title="Map" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="search" title="Search" />
          ),
        }}
      />
    </Tabs>
  );
}
