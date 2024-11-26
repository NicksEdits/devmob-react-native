import React from "react";
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FormMolecule } from "@/components/molecules";
import { Text } from "@/components/atoms";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { Link } from "expo-router";

const RegisterPage: React.FC = () => {
  return (
    <AuthTemplate title="S'inscrire">
      <KeyboardAvoidingView  behavior={"padding"} style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
      }}>

      <FormMolecule.Register />
      <Link href="/login">
        <Text.Link style={styles.linkText}>Se connecter</Text.Link>
      </Link>
      </KeyboardAvoidingView>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  linkText: {
    marginTop: 20,
  },
});

export default RegisterPage;
