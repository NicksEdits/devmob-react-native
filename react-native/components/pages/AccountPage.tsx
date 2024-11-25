import React, { useState } from "react";
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import { ProfileCard } from "@/components/molecules/ProfileMolecule";
import { RequestPostOrganism } from "@/components/organismes";
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";
import { Container } from "../atoms";
import { LogoutButton } from "../molecules/LogoutMolecule";

const Account = () => {
  const fakeData = [
    {
      id: 1,
      // label: "****..1234",
      title: "John Doe",
      // loc: 200,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
  const [username, setUsername] = useState("Username");
  const [data, setData] = useState<RequestPostTypeFromDB[] | RequestPostType[]>(
    fakeData
  );
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);

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

  return (
    // <SafeAreaView style={styles.safeArea}>

    <Container.Page>
      <LogoutButton />
      <ProfileCard
        username={username}
        src={
          "https://profilepictures.socratic.org/nXY7kdi5QymgeGu7uEqB_default-male-avatar-profile-picture-icon-grey-man-photo-placeholder-vector-illustration-88414414.jpg"
        }
      />
      <ProfileActions
        onEditUsername={(value: string) => {
          setUsername(value);
        }}
        onChangePassword={(value: string) => {
          console.log(value);
        }}
      />
      <RequestPostOrganism.CardList data={fakeData} />
    </Container.Page>
    // </SafeAreaView>
  );
};

export default Account;
