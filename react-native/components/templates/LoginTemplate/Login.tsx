import React from "react";
import { StyleSheet } from "react-native";
import { LoginMolecule } from "@/components/molecules";
import { Text, Container } from "@/components/atoms";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginTemplate: React.FC<Props> = ({ navigation }) => {
  return (
    <Container.Form style={styles.container}>
      <Text.TitleCard containerStyle={styles.titleContainer}>
        Se connecter
      </Text.TitleCard>
      <LoginMolecule.LoginForm navigation={navigation} />
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
});

export default LoginTemplate;
