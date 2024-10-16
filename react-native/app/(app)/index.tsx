import { createStackNavigator } from "@react-navigation/stack";
// import { LoginTemplate, RegisterTemplate } from '@/components/templates';
import Login from "@/components/templates/LoginTemplate/Login";
import Register from "@/components/templates/RegisterTemplate/Register";
import { Text } from "@/components/atoms";

const HomeScreen = () => {
  return <Text.DescriptionCard>Home</Text.DescriptionCard>;
};

export default HomeScreen;
