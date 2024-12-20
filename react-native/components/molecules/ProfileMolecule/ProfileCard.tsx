import React from "react";
import { ImageSourcePropType } from "react-native";
import Base from "@/components/atoms/Container/Base";
import { Image, Text } from "@/components/atoms";
import { Asset } from "expo-asset";

interface ProfileHeaderProps {
  src: string | Asset;
  username: string;
}

const ProfileCard: React.FC<ProfileHeaderProps> = ({ src, username }) => {
  return (
    <Base style={{ marginVertical: 20 }}>
      <Image.AccountAvatar src={src} />
      <Text.Bold>{username}</Text.Bold>
    </Base>
  );
};

export default ProfileCard;
