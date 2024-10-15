import { createStackNavigator } from "@react-navigation/stack";
// import { LoginTemplate, RegisterTemplate } from '@/components/templates';
import Register from "@/components/templates/RegisterTemplate/Register";
import { View } from "react-native";

// const Stack = createStackNavigator();

const SignupScreen = () => {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="Register" component={Register} />
    //   <Stack.Screen name="Register" component={Register} />
    // </Stack.Navigator>
    <View>
      <Register></Register>
    </View>
  );
};

export default SignupScreen;
