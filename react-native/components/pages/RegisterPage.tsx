import React from "react";
import { StyleSheet } from "react-native";
import { RegisterMolecule } from "@/components/molecules";
import { Text } from "@/components/atoms";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { Link } from "expo-router";

const RegisterPage: React.FC = () => {
  return (
    <AuthTemplate title="S'inscrire">
      <RegisterMolecule.RegisterForm />
      <Link href="/login">
        <Text.Link style={styles.linkText}>Se connecter</Text.Link>
      </Link>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  linkText: {
    marginTop: 20,
  },
});

export default RegisterPage;
