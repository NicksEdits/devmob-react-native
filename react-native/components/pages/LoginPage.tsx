import React from "react";
import { StyleSheet } from "react-native";
import { LoginMolecule } from "@/components/molecules";
import { Text } from "@/components/atoms";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { Link } from "expo-router";

const LoginPage: React.FC = () => {
  return (
    <AuthTemplate title="Se connecter">
      <LoginMolecule.LoginForm />
      <Link href="/signup">
        <Text.Link style={styles.linkText}>S'inscrire</Text.Link>
      </Link>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  linkText: {
    marginTop: 20,
  },
});

export default LoginPage;
