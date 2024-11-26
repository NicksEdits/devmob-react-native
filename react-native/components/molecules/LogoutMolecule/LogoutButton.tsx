import { logout } from "@/utils/auth";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Icon } from "@/components/atoms";
import React from "react";

interface LogoutButtonProps {
  style?: any;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ style = {} }) => {
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <Pressable onPress={handleLogout} style={style}>
      <Icon.Logout size={25} />
    </Pressable>
  );
};

export default LogoutButton;
