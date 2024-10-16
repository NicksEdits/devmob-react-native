import { Redirect, Slot } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initAuthState } from "@/store";
import { Text } from "react-native";

export default function Layout() {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    dispatch(initAuthState());
  }, []);

  const el = useMemo(() => {
    if (status === "loading") {
      return <Text>Loading...</Text>;
    } else if (isAuthenticated && status !== "failed") {
      return <Redirect href="/" />;
    } else {
      return <Slot />;
    }
  }, [status]);

  return el;
}
