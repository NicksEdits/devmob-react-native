import { Redirect, Tabs } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useDispatch, useSelector } from "react-redux";
import { initAuthState } from "@/store/auth";
import { authStatus } from "@/utils/auth";
import { NightThemeProviderContext } from "../providers/CustomThemeProvider";
import { Container, Loader } from "@/components/atoms";

const TabLayout = () => {
  const themeHandler = useContext(NightThemeProviderContext);

  const [theme, setTheme] = useState(themeHandler.night.getTheme());

  useEffect(() => {
    setTheme(themeHandler.night.getTheme());
  }, [themeHandler.night.isNight]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.texts.primary,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: theme.colors.pages.primary,
        },
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
    if (status === authStatus.LOADING) {
      return (
        <Container.Page
          style={{
            justifyContent: "center",
          }}
        >
          <Loader.Spinner />
        </Container.Page>
      );
    } else if (!isAuthenticated || status === "failed") {
      return <Redirect href="/login" />;
    } else {
      return <TabLayout />;
    }
  }, [status]);

  return el;
}
