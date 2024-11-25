import { Redirect, Tabs } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useDispatch, useSelector } from "react-redux";
import { initAuthState } from "@/store";
import { Text } from "react-native";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My Account",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state: any) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(initAuthState());
  }, []);

  const el = useMemo(() => {
    if (status === "loading") {
      return <Text>Loading...</Text>;
    } else if (!isAuthenticated || status === "failed") {
      return <Redirect href="/login" />;
    } else {
      return <TabLayout />;
    }
  }, [status]);

  return el;
}
