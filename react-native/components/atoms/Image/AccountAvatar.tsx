import { Asset } from "expo-asset";
import React from "react";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";
interface AccountAvatarProps {
  src: string | Asset;
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ src }) => {
  return typeof src === "string" ? (
    <Image src={src} style={styles.profileImage} />
  ) : (
    <Image source={{ uri: src.uri }} style={styles.profileImage} />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
});

export default AccountAvatar;
