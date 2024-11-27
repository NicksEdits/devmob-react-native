import { Asset } from "expo-asset";
import React from "react";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";
import Base from '@/components/atoms/Container/Base'

interface AvatarCardProps {
  src: string | Asset;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ src }) => (
  <Base
    style={{
      padding: 0,
      paddingRight: 10,
    }}
  >
    {typeof src === "string" ? (
      <Image src={src} style={styles.image} />
    ) : (
      <Image source={{ uri: src.uri }} style={styles.image} />
    )}
  </Base>
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    objectFit: "cover",
  },
});

export default AvatarCard;
