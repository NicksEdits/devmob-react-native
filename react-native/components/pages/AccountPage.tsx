import React, { useEffect, useState } from "react";
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import { ProfileCard } from "@/components/molecules/ProfileMolecule";
import { RequestPostOrganism } from "@/components/organismes";
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";
import { LogoutButton } from "@/components/molecules/LogoutMolecule";
import { StyleSheet } from "react-native";
import { NightThemeToggle } from "@/components/molecules/ThemeMolecule";
import { useDispatch, useSelector } from "react-redux";
import { get, patch, post, del } from '@/utils/api'
import { setUser } from "@/store/auth";
import { useAssets } from "expo-asset";
import { useFocusEffect } from 'expo-router'

const AccountPage: React.FC = () => {
  const [userImages, userImageError] = useAssets([
    require("@/assets/images/user-image.png"),
  ]);

  const { user } = useSelector((state: any) => {
    return state.auth;
  });
  const fakeData = [
    {
      id: 1,
      // label: "****..1234",
      title: "John Doe",
      // loc: 200,
      description: "Lorem  adipiscing elit.",
    },
    {
      id: 2,
      // label: "****..5678",
      title: "Jane Smith",
      // loc: 200,
      description:
        "Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.",
    },
  ];
  const [username, setUsername] = useState("");
  const [data, setData] = useState<RequestPostTypeFromDB[]>(
    []
  );
  const [isFetched, setIsFetched] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
    // loc: string;
  }) => {
    // if (editingItem) {
    //   // Modification d'un élément existant
    //   setData((prevData) =>
    //     prevData.map((item) =>
    //       item.id === editingItem.id
    //         ? {
    //             ...item,
    //             title: formData.title,
    //             description: formData.description,
    //             // loc: parseInt(formData.distance),
    //           }
    //         : item
    //     )
    //   );
    // } else {
    //   // Ajout d'un nouvel élément
    //   const newItem: RequestPostType = {
    //     title: formData.title,
    //     description: formData.description,
    //     // loc: parseInt(formData.distance),
    //   };
    //   setData((prevData) => [...prevData, newItem]);
    // }
    console.log("Form data", formData);
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleEditPress = (item: RequestPostType) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  function getPostsMe() {
    get(`request-posts/me`,  )
      .catch((err) => {{}
        // TODO: toast
      })
      .then((res) => {
        setData(res);
        setIsFetched(true);
        console.log(res);
        console.log("User get post");
      });
  }

  function deletePostsMe(id: number) {
    del(`request-posts/${id}`,  )
      .catch((err) => {{}
        // TODO: toast
      })
      .then((res) => {
        setData(res);
        setIsFetched(true);
        console.log(res);
        console.log("User get post");
      });
  }

  async function updateUsernameUser(username: string) {
    await patch(`users/${user.id}`, { username })
      .catch((err) => {
        if (err.response?.status === 401) {
          throw new Error("Invalid credentials");
        }
      })
      .then((res) => {
        dispatch(setUser(res));
        console.log(res);
        console.log("User updated");
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      getPostsMe();  // Appeler getPostsMe à chaque fois que la page est en focus
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
          throw new Error("Invalid credentials");
        }
      })
      .then((res) => {
        console.log("User Password updated");
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
      <RequestPostOrganism.CardList
        data={data}
        onEditPress={() => console.log("edit")}
        onButtonPress={() => console.log("button")}
      />
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
