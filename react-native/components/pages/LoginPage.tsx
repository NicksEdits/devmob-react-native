import React from "react";
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { FormMolecule } from "@/components/molecules";
import { Text } from "@/components/atoms";
import AuthTemplate from "@/components/templates/AuthTemplate";
import { Link } from "expo-router";

const LoginPage: React.FC = () => {
  return (

    <AuthTemplate title="Se connecter">
      <KeyboardAvoidingView  behavior={"padding"} style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
      }}>
      <FormMolecule.Login />
        <Link href="/signup">
          <Text.Link style={styles.linkText}>S'inscrire</Text.Link>
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

export default LoginPage;
