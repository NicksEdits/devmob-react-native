import React from "react";
import { Image, StyleSheet, ImageSourcePropType } from "react-native";

interface AccountAvatarProps {
  src: string;
}

const AccountAvatar: React.FC<AccountAvatarProps> = ({ src }) => {
  return <Image src={src} style={styles.profileImage} />;
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
