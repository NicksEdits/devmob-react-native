import React, { useEffect, useState } from 'react'
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import { ProfileCard } from "@/components/molecules/ProfileMolecule";
import { RequestPostOrganism } from "@/components/organismes";
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";
import { Container } from "../atoms";
import { useDispatch, useSelector } from 'react-redux';
import { get, patch, post } from '@/utils/api';
import * as LocalStorage from '@/utils/localStorage';
import { setUser } from '@/store';
import { LogoutButton } from "../molecules/LogoutMolecule";

const AccountPage: React.FC = () => {

  const { user } = useSelector((state:any) => {
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
  const [data, setData] = useState<RequestPostTypeFromDB[] | RequestPostType[]>(
    fakeData
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if(user) {
      setUsername(user.username);
    }
  }, [user])

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


   async function updateUsernameUser(username: string) {
    await patch(`users/${user.id}`, { username }).catch((err) => {
      if (err.response?.status === 401) {
        throw new Error("Invalid credentials");
      }
    }).then((res) => {
      dispatch(setUser(res));
      console.log(res);
      console.log("User updated");
    });
  }

  async function updatePasswordUser(oldPassword: string, newPassword: string, confirmNewPassword: string) {
    let body = {
      'currentPassword': oldPassword,
      'newPassword': newPassword,
      'confirmNewPassword': confirmNewPassword,
    }
    await post(`users/update-password`,  body).catch((err) => {
      if (err.response?.status === 401) {
        throw new Error("Invalid credentials");
      }
    }).then((res) => {
      console.log("User Password updated");
    });
  }

  return (
    // <SafeAreaView style={styles.safeArea}>

    <Container.Page>
      <LogoutButton />
      <ProfileCard
        username={username}
        src={
          "https://hds.hel.fi/images/foundation/visual-assets/placeholders/user-image-l@3x.png"
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
      <RequestPostOrganism.CardList data={fakeData} onEditPress={() => console.log('edit')} onButtonPress={() => console.log('button')} />
    </Container.Page>
    // </SafeAreaView>
  );
};

export default AccountPage;
