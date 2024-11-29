import React, { useEffect, useState } from "react";
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
import { del, patch } from "@/utils/api";
import { useToast } from "react-native-toast-notifications";

interface CardProps {
  data: RequestPostType;
  mine?: boolean;
  style?: any;
  deleted?: () => void;
}

const Card: React.FC<CardProps> = ({ data, mine = false, style, deleted }) => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);
  const [postData, setPostData] = useState<RequestPostType>(data);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setPostData(data);
  }, [data]);

  const onEditModalClose = () => {
    setShowEditModal(false);
  };

  const onEditSumbit = (formData: RequestPostTypeForForm) => {
    patch(`request-posts/${postData.id}`, formData)
      .then((res) => {
        toast.show("Le poste a bien été modifié", {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
        setShowEditModal(false);
        setPostData(res);
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

  const onDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    del(`request-posts/${data.id}`)
      .then(() => {
        toast.show("Le poste a bien été supprimé", {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
        setShowDeleteModal(false);
        deleted();
      })
      .catch((err) => {
        if (err.status === 401) {
          toast.show("Vous ne pouvez pas supprimer ce poste", {
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
          <Text.LabelCard>{postData.user.username}</Text.LabelCard>
          <Text.TitleCard>{postData.title}</Text.TitleCard>
        </Container.CardHeader>
      </Container.CardHeader>

      <Text.DescriptionCard>{postData.description}</Text.DescriptionCard>

      {!mine && (
        <Container.CardBody justifyContent={"space-between"}>
          <Text.TextCard>{"À " + 0 + " mètres d'ici"}</Text.TextCard>
          <RequestPostOrganism.ContactButton post={postData} />
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
                title: postData.title,
                description: postData.description,
                phone: postData.phone,
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

          <ModalMolecule.Modal
            isOpen={showDeleteModal}
            onClose={onDeleteModalClose}
          >
            <Text.Bold>
              Voulez vous vraiment supprimer le poste {postData.title} ?
            </Text.Bold>
            <Container.Row style={{ marginTop: 30 }}>
              <Button.Global
                onPress={() => {
                  setShowDeleteModal(false);
                }}
                buttonStyle={styles.cancelDeleteBtn}
              >
                <Text.Button>Annuler</Text.Button>
              </Button.Global>
              <Button.Global
                onPress={confirmDelete}
                buttonStyle={styles.deleteBtn}
              >
                <Text.Button>Confirmer</Text.Button>
              </Button.Global>
            </Container.Row>
          </ModalMolecule.Modal>
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
      href={`/post/${postData.id}`}
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
  cancelDeleteBtn: {
    backgroundColor: "#000",
  },
  deleteBtn: {
    backgroundColor: "#ff0000",
  },
});

export default Card;
