import { Asset } from "expo-asset";
import React from "react";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Container } from "@/components/atoms";

interface AvatarCardProps {
  src: string | Asset;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ src }) => (
  <Container.Base
    style={{
      paddingLeft: 0,
    }}
  >
    {typeof src === "string" ? (
      <Image src={src} style={styles.image} />
    ) : (
      <Image source={{ uri: src.uri }} style={styles.image} />
    )}
  </Container.Base>
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
    backgroundColor: "black",
  },
});

export default AvatarCard;
