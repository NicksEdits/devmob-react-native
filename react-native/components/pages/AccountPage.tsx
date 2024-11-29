import React, { useEffect, useState } from "react";
import { ProfileOrganism, RequestPostOrganism } from "@/components/organismes";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { Container, Loader } from "@/components/atoms";
import { StyleSheet } from "react-native";
import {
  ThemeMolecule,
  LogoutMolecule,
  ProfileMolecule,
} from "@/components/molecules";
import { useDispatch, useSelector } from "react-redux";
import { get, patch, post } from "@/utils/api";
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
  const [postLoading, setPostLoading] = useState(true);
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
        setPostLoading(false);
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
      <ThemeMolecule.NightThemeToggle style={styles.themeSwicth} />
      <LogoutMolecule.LogoutButton style={styles.logoutButton} />
      <ProfileMolecule.ProfileCard
        username={username}
        src={
          userImages
            ? userImages[0]
            : "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
        }
      />
      <ProfileOrganism.ProfileActions
        onEditUsername={(value: string) => {
          updateUsernameUser(value);
        }}
        onChangePassword={(oldPassword, newPassword, confPassword) => {
          updatePasswordUser(oldPassword, newPassword, confPassword);
        }}
      />
      {postLoading ? (
        <Loader.Spinner />
      ) : (
        <RequestPostOrganism.CardList data={data} reload={getPostsMe} mine />
      )}
    </Container.Page>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  themeSwicth: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  logoutButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

export default AccountPage;
