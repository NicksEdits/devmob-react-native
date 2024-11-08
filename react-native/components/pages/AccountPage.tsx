import React, { useState } from "react";
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import { ProfileCard } from "@/components/molecules/ProfileMolecule";
import { CardOrganism } from "@/components/organismes";
import ScrollBase from "@/components/atoms/Container/ScrollBase";

interface ListProps {
  initialData: ListItem[];
}

interface ListItem {
  id: string;
  label: string;
  title: string;
  description: string;
  loc: number;
}

const Account = () => {
  const fakeData = [
    {
      id: "1",
      label: "****..1234",
      title: "John Doe",
      loc: 200,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "2",
      label: "****..5678",
      title: "Jane Smith",
      loc: 200,
      description:
        "Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.",
    },
  ];
  const [username, setUsername] = useState("Username");
  const [data, setData] = useState<ListItem[]>(fakeData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  const handleFormSubmit = (formData: {
    label: string;
    username: string;
    description: string;
    distance: string;
  }) => {
    if (editingItem) {
      // Modification d'un élément existant
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                label: formData.label,
                title: formData.username,
                description: formData.description,
                loc: parseInt(formData.distance),
              }
            : item
        )
      );
    } else {
      // Ajout d'un nouvel élément
      const newItem: ListItem = {
        id: Date.now().toString(), // Générez un ID unique
        label: formData.label,
        title: formData.username,
        description: formData.description,
        loc: parseInt(formData.distance),
      };
      setData((prevData) => [...prevData, newItem]);
    }
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleEditPress = (item: ListItem) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  return (
    // <SafeAreaView style={styles.safeArea}>

    <ScrollBase>
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
      {fakeData.map((item, index) => (
        <CardOrganism.CardList
          key={item.id}
          label={item.label}
          title={item.title}
          style={{ paddingLeft: 60 }}
          description={item.description}
          loc={item.loc}
          onButtonPress={() => console.log(`Button pressed ${item.id}`)}
          onEditPress={() => handleEditPress(item)}
        />
      ))}
    </ScrollBase>
    // </SafeAreaView>
  );
};

export default Account;
