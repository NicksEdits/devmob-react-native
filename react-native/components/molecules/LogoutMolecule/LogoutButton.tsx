import { logout } from "@/utils/auth";
import { router } from "expo-router";
import { StyleSheet, Pressable } from "react-native";
import Icon from "@/components/atoms/Icon";

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };
  return (
    <Pressable onPress={handleLogout} style={styles.logoutButton}>
      <Icon.Logout />
    </Pressable>
  );
};

const styles = StyleSheet.create({
    logoutButton: {
      position: "absolute",
      right: 0,
      margin: 20,
      top: 0,
    },
});

export default LogoutButton;
