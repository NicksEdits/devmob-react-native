import { createStackNavigator } from "@react-navigation/stack";
// import { LoginTemplate, RegisterTemplate } from '@/components/templates';
import Login from "@/components/templates/LoginTemplate/Login";
import Register from "@/components/templates/RegisterTemplate/Register";

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthScreen;
