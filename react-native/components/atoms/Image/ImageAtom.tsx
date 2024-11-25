import React from 'react';
import { Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ImageAtomProps {
  src: string;
}

const ImageAtom: React.FC<ImageAtomProps> = ({ src }) => {
  return <Image src={src} source={src} style={styles.profileImage} />;
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
});

export default ImageAtom;