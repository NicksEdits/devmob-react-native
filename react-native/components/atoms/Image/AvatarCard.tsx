import React from 'react';
import { Image, StyleSheet, ImageSourcePropType, View } from 'react-native'
import { Container } from '@/components/atoms'

interface AvatarCardProps {
  src: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ source }) => (
    <Container.Base style={{
        paddingLeft:0,
    }}>
        <Image  src={source}  style={styles.image} />
    </Container.Base>
);

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
    backgroundColor: 'black',
  },
});

export default AvatarCard;
