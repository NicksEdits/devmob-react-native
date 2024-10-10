import React from 'react';
import {View, StyleSheet, GestureResponderEvent} from 'react-native';
import Image from "@/components/atoms/Image";
import {Button, Text} from "@/components/atoms";
import {Container} from "@/components/atoms";
import {CardMolecule} from "@/components/molecules";
import {CardHeader} from "@/components/atoms/Container";

interface CardListProps {
  label: string,
  title: string,
  description: string,
  onButtonPress: (event: GestureResponderEvent) => void,
  style?: any
}

const CardList: React.FC<CardListProps> = ({label, title, description, onButtonPress, style}) => (
  <Container.Card style={styles.card}>
    <Container.CardHeader>
      <Container.CardBody>
        <Image.AvatarCard
          source={"https://profilepictures.socratic.org/nXY7kdi5QymgeGu7uEqB_default-male-avatar-profile-picture-icon-grey-man-photo-placeholder-vector-illustration-88414414.jpg"}/>
        <CardMolecule.CardList label={label} title={title} description={description}/>
      </Container.CardBody>
      <Text.DescriptionCard>{description}</Text.DescriptionCard>
    </Container.CardHeader>
    {/*<Button.ButtonCard onPress={onButtonPress} title="Button" />*/}
  </Container.Card>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ADD8E6', // couleur bleu clair
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardList;