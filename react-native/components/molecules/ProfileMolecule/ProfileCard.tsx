import React from 'react';
import { ImageSourcePropType } from 'react-native';
import Base from "@/components/atoms/Container/Base";
import ImageAtom from "@/components/atoms/Image/ImageAtom";
import {Text} from "@/components/atoms";

interface ProfileHeaderProps {
  src: string;
  username: string;
}

const ProfileCard: React.FC<ProfileHeaderProps> = ({ src, username }) => {
  return (
    <Base style={{ marginVertical: 20 }}>
      <ImageAtom src={src} />
      <Text.LabelCard >{username}</Text.LabelCard>
    </Base>
  );
};

export default ProfileCard;