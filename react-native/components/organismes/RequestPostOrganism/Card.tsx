import React from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import Icon from "@/components/atoms/Icon";
import Image from "@/components/atoms/Image";
import { Button, Text } from "@/components/atoms";
import { Container } from "@/components/atoms";
import { CardMolecule } from "@/components/molecules";

interface CardProps {
  label: string;
  title: string;
  description: string;
  onButtonPress: (event: GestureResponderEvent) => void;
  onEditPress?: () => void;
  style?: any;
  loc: number;
}

const Card: React.FC<CardProps> = ({
  label,
  title,
  description,
  onButtonPress,
  onEditPress,
  loc,
  style,
}) => (

  <Container.Card>
    <Container.CardHeader style={{alignItems:"center"}}>
      <Image.AvatarCard
        source={
          "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
        }
      />
      <Container.CardHeader style={{flexDirection: "column"}}>
        <Text.LabelCard>{label}</Text.LabelCard>
        <Text.TitleCard>{title}</Text.TitleCard>
      </Container.CardHeader>
      {/*<CardMolecule.CardHeader label={label} title={title} />*/}
      {onEditPress && (
        <Pressable onPress={onEditPress} style={styles.editIcon}>
          <Icon.Edit />
        </Pressable>
      )}
    </Container.CardHeader>

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
  </Container.Card>
);

const styles = StyleSheet.create({
  btnCard: {
    backgroundColor: "#000",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Card;
