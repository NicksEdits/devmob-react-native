import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface AvatarCardProps {
  source: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ source }) => (
  <Image  src={source}  style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // pour un effet rond
    backgroundColor: 'black',
  },
});

export default AvatarCard;