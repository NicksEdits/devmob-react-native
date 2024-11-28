import React, { useEffect, useState } from "react";
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import { ProfileCard } from "@/components/molecules/ProfileMolecule";
import { RequestPostOrganism } from "@/components/organismes";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";
import { LogoutButton } from "@/components/molecules/LogoutMolecule";
import { StyleSheet } from "react-native";
import { NightThemeToggle } from "@/components/molecules/ThemeMolecule";
import { useDispatch, useSelector } from "react-redux";
import { get, patch, post, del } from "@/utils/api";
import { setUser } from "@/store/auth";
import { useAssets } from "expo-asset";
import { useFocusEffect } from "expo-router";
import { useToast } from "react-native-toast-notifications";

const AccountPage: React.FC = () => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);

  const { user } = useSelector((state: any) => {
    return state.auth;
  });
  const [username, setUsername] = useState("");
  const [data, setData] = useState<RequestPostType[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  function getPostsMe() {
    get(`request-posts/me`)
      .catch((err) => {
        toast.show("Quelque chose s'est mal passé", {
          type: "danger",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
      })
      .then((res) => {
        setData(res);
        setIsFetched(true);
      });
  }

  async function updateUsernameUser(username: string) {
    await patch(`users/${user.id}`, { username })
      .catch((err) => {
        toast.show("Quelque chose s'est mal passé", {
          type: "danger",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
      })
      .then((res) => {
        toast.show("Votre nom d'utilisateur a bien été modifié", {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
        dispatch(setUser(res));
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      getPostsMe(); // Appeler getPostsMe à chaque fois que la page est en focus
    }, [])
  );

  async function updatePasswordUser(
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    let body = {
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };
    await post(`users/update-password`, body)
      .catch((err) => {
        if (err.response?.status === 401) {
          toast.show("Votre ancien mot de passe est incorrecte", {
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
      })
      .then((res) => {
        toast.show("Votre mot de passe a bien été modifié", {
          type: "success",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
      });
  }

  return (
    // <SafeAreaView style={styles.safeArea}>

    <Container.Page>
      <NightThemeToggle style={styles.themeSwicth} />
      <LogoutButton style={styles.logoutButton} />
      <ProfileCard
        username={username}
        src={
          userImages
            ? userImages[0]
            : "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
        }
      />
      <ProfileActions
        onEditUsername={(value: string) => {
          updateUsernameUser(value);
        }}
        onChangePassword={(oldPassword, newPassword, confPassword) => {
          updatePasswordUser(oldPassword, newPassword, confPassword);
        }}
      />
      <RequestPostOrganism.CardList data={data} reload={getPostsMe} mine />
    </Container.Page>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  themeSwicth: {
    position: "absolute",
    left: 0,
    margin: 20,
    top: 0,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    margin: 20,
    top: 0,
  },
});

export default AccountPage;
