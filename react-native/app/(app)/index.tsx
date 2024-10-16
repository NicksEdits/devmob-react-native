import { Button, Text } from "@/components/atoms";
import { logout } from "@/utils/auth";
import { router } from "expo-router";

const HomeScreen = () => {
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <>
      <Text.DescriptionCard>Home</Text.DescriptionCard>
      <Button.ButtonCard title="Logout" onPress={handleLogout} />
    </>
  );
};

export default HomeScreen;
