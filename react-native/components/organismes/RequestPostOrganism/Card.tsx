import React from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import { Button, Text } from "@/components/atoms";
import { Container, Image, Icon } from "@/components/atoms";
import { CardMolecule } from "@/components/molecules";
import { useAssets } from "expo-asset";

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
}) => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);

  return (
    <Container.Card>
      <Container.CardBody>
        <Image.AvatarCard
          src={
            userImages
              ? userImages[0]
              : "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
          }
        />
          <Container.CardHeader style={{flexDirection: "column"}}>
              <Text.LabelCard>{label}</Text.LabelCard>
              <Text.TitleCard>{title}</Text.TitleCard>
          </Container.CardHeader>
        {onEditPress && (
          <Pressable onPress={onEditPress} style={styles.editIcon}>
            <Icon.Edit />
          </Pressable>
        )}
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
    </Container.Card>
  );
};

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
