import React from "react";
import { StyleSheet, GestureResponderEvent, Pressable } from "react-native";
import { Button, Text } from "@/components/atoms";
import { Container, Image, Icon } from "@/components/atoms";
import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import {
  RequestPostType,
  RequestPostTypeForForm,
} from "@/interfaces/RequestPostType";
import { RequestPostOrganism } from "@/components/organismes";
import { FormMolecule, ModalMolecule } from "@/components/molecules";
import { patch } from "@/utils/api";
import { useToast } from "react-native-toast-notifications";

interface CardProps {
  data: RequestPostType;
  mine?: boolean;
  style?: any;
  reload?: () => void;
}

const Card: React.FC<CardProps> = ({ data, mine = false, style, reload }) => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const toast = useToast();

  const onEditModalClose = () => {
    setShowEditModal(false);
  };

  const onEditSumbit = (formData: RequestPostTypeForForm) => {
    patch(`request-posts/${data.id}`, formData)
      .then(() => {
        toast.show("Le poste a bien modifié", {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
        setShowEditModal(false);
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.show("Vous ne pouvez pas modifier ce poste", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        } else {
          toast.show("Quelque chose s'est mal passé", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        }
      });
  };

  const Content = () => (
    <Container.Card style={style}>
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

      {!mine && (
        <Container.CardBody justifyContent={"space-between"}>
          <Text.DescriptionCard>
            {"À " + 0 + " mètres d'ici"}
          </Text.DescriptionCard>
          <RequestPostOrganism.ContactButton post={data} />
        </Container.CardBody>
      )}
      {mine && (
        <Container.CardFooter>
          <ModalMolecule.Modal
            isOpen={showEditModal}
            onClose={onEditModalClose}
          >
            <FormMolecule.RequestPost
              onSubmit={onEditSumbit}
              initialData={{
                title: data.title,
                description: data.description,
                phone: data.phone,
              }}
            />
          </ModalMolecule.Modal>
          <Button.Global
            onPress={(e) => {
              e.preventDefault();
              setShowEditModal(true);
            }}
            buttonStyle={styles.editBtn}
          >
            <Text.Button>Modifier</Text.Button>
          </Button.Global>
          <Button.Global
            onPress={(e) => {
              e.preventDefault();
              setShowDeleteModal(true);
            }}
            buttonStyle={styles.deleteBtn}
          >
            <Text.Button>Supprimer</Text.Button>
          </Button.Global>
        </Container.CardFooter>
      )}
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
  editBtn: {
    backgroundColor: "#000",
  },
  deleteBtn: {
    backgroundColor: "#ff0000",
  },
});

export default Card;
