import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Container, Text } from "@/components/atoms";

export default function NotFoundScreen() {
  return (
    <Container.Page style={styles.container}>
      <Text.Common>This screen doesn't exist.</Text.Common>
      <Link href="/" style={styles.link}>
        <Text.Link>Go to home screen!</Text.Link>
      </Link>
    </Container.Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
