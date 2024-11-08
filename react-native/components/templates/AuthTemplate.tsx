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
      <Text.TitleCard containerStyle={styles.titleContainer}>
        {title}
      </Text.TitleCard>
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
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
});

export default AuthTemplate;
