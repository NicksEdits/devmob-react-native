import React from "react";
import { StyleSheet } from "react-native";
import { Text, Container } from "@/components/atoms";

type Props = {
  title: string;
  children: React.ReactNode;
};

const AuthTemplate: React.FC<Props> = ({ title, children, ...props }) => {
  return (
    <Container.Page style={styles.container} {...props}>
      <Text.Bold>{title}</Text.Bold>
      {children}
    </Container.Page>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default AuthTemplate;
