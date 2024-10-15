import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@/components/atoms";
import { RegisterMolecule } from "@/components/molecules";
import { Container } from "@/components/atoms";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterTemplate: React.FC<Props> = ({ navigation }) => {
  return (
    <Container.Form>
      <Text.TitleCard containerStyle={styles.titleContainer}>
        S'inscrire
      </Text.TitleCard>
      <RegisterMolecule.RegisterForm navigation={navigation} />
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterTemplate;
