import React from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import Image from "@/components/atoms/Image";
import { Button, Text } from "@/components/atoms";
import { Container } from "@/components/atoms";
import { CardMolecule } from "@/components/molecules";

interface CardHeaderProps {
  label: string;
  title: string;
  description: string;
  onButtonPress: (event: GestureResponderEvent) => void;
  style?: any;
  loc: number;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  label,
  title,
  description,
  onButtonPress,
  loc,
  style,
}) => (
  <Container.Card style={styles.card}>
    <Container.CardHeader>
      <Container.CardBody>
        <Image.AvatarCard
          source={
            "https://profilepictures.socratic.org/nXY7kdi5QymgeGu7uEqB_default-male-avatar-profile-picture-icon-grey-man-photo-placeholder-vector-illustration-88414414.jpg"
          }
        />
        <CardMolecule.CardHeader label={label} title={title} />
      </Container.CardBody>

      <Text.DescriptionCard>{description}</Text.DescriptionCard>

      <Container.CardBody justifyContent={"space-between"}>
        <Text.DescriptionCard>
          {"À " + loc + " mètres d'ici"}
        </Text.DescriptionCard>
        <Button.ButtonCard
          onPress={onButtonPress}
          title="Button"
          buttonStyle={styles.btnCard}
        />
      </Container.CardBody>
    </Container.CardHeader>
  </Container.Card>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnCard: {
    backgroundColor: "#000",
  },
});

export default CardHeader;
