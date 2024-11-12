import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Input, Text } from "@/components/atoms";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store";
import { register } from "@/utils/auth";
import { router } from "expo-router";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const submit = () => {
    register(username, password)
      .then((payload) => {
        dispatch(setAuthState(payload));
        setError("");
        router.replace("/");
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Container.Form style={styles.container}>
      <Input.TextInput
        placeholder="Nom d'utilisateur"
        onChangeText={(e) => setUsername(e)}
      />
      <Input.TextInput
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(e) => setPassword(e)}
      />
      {error && (
        <Text.Error style={{ marginBottom: "10px" }}>{error}</Text.Error>
      )}
      <Button.ButtonCard title="S'inscrire" onPress={submit} />
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Register;
