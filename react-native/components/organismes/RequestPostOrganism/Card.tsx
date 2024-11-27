import React from "react";
import { StyleSheet, GestureResponderEvent, Pressable } from "react-native";
import { Text } from "@/components/atoms";
import { Container, Image, Icon } from "@/components/atoms";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { RequestPostOrganism } from "@/components/organismes";

interface CardProps {
  data: RequestPostType;
  mine?: boolean;
  onEditPress?: () => void;
  onDeletePress?: () => void;
  style?: any;
}

const Card: React.FC<CardProps> = ({
  data,
  mine = false,
  onEditPress,
  style,
  showEditButton = false,
  showDeleteButton = false,
  showContactButton = true,
}) => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);

  const Content = () => (
    <Container.Card>
      <Container.CardHeader
        style={{ alignItems: "center", flexDirection: "row" }}
      >
        <Image.AvatarCard
          src={
            userImages
              ? userImages[0]
              : "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
          }
        />
        <Container.CardHeader style={{ flexDirection: "column" }}>
          <Text.LabelCard>{data.user.username}</Text.LabelCard>
          <Text.TitleCard>{data.title}</Text.TitleCard>
        </Container.CardHeader>
      </Container.CardHeader>

      <Text.DescriptionCard>{data.description}</Text.DescriptionCard>

        {!mine && (<Container.CardBody justifyContent={"space-between"}>
        <Text.DescriptionCard>
          {"À " + 0 + " mètres d'ici"}
        </Text.DescriptionCard>
                <RequestPostOrganism.ContactButton post={data} />
      </Container.CardBody>
        )}
      <Container.CardFooter>
        {mine && (
          <CardMolecule.ButtonCard
          title="Edit"
          onPress={onEditPress}
          buttonStyle={styles.btnCard}
          />
        )}
        {mine && (
          <CardMolecule.ButtonCard
          title="Supprimer"
          buttonStyle={styles.btnCard}
          />
        )}
        {mine && (
          <CardMolecule.ButtonCard
            title="Contact"
            buttonStyle={styles.btnCard}
          />
        )}
      </Container.CardFooter>
    </Container.Card>
  );

  return mine ? (
    <Content />
  ) : (
    <Link
      push
      href={`/post/${data.id}`}
      style={{
        width: "100%",
      }}
    >
      <Content />
    </Link>
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
