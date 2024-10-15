import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button, Container, Input, Text } from "@/components/atoms";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "@/store";
import { login } from "@/utils/auth";

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

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const handleSignupPress = () => {
    navigation.navigate("Register");
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // const store = useSelector((state) => {
  //   console.log(state);
  //   return state;
  // });

  const submit = () => {
    login(username, password)
      .then((payload) => {
        dispatch(setAuthState(payload));
        setError("");
        // navigation.navigate("index");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Container.Form style={styles.container}>
      <Input.Input
        placeholder="Nom d'utilisateur"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input.Input
        placeholder="Mot de passe"
        secureTextEntry
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Text.Error style={{ marginBottom: "10px" }}>{error}</Text.Error>
      )}
      <Button.ButtonCard title="Se connecter" onPress={submit} />
      <TouchableOpacity onPress={handleSignupPress}>
        <Text.DescriptionCard style={styles.signupText}>
          S'inscrire
        </Text.DescriptionCard>
      </TouchableOpacity>
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  signupText: {
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default LoginForm;
