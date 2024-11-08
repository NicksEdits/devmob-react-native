import React, { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { CardOrganism } from "@/components/organismes";
import ScrollView = Animated.ScrollView;
import { Form } from "@/components/molecules";
import { Button, Container } from "../atoms";
import Modal from "../atoms/Container/Modal";

interface ListItem {
  id: string;
  title: string;
  description: string;
  // loc: number;
}

interface ListProps {
  initialData: ListItem[];
}

const List: React.FC<ListProps> = ({ initialData }) => {
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState<ListItem[]>(initialData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
  }) => {
    if (editingItem) {
      // Modification d'un élément existant
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                title: formData.title,
                description: formData.description,
                // loc: parseInt(formData.distance),
              }
            : item
        )
      );
    } else {
      // Ajout d'un nouvel élément
      const newItem: ListItem = {
        id: Date.now().toString(), // Générez un ID unique
        title: formData.title,
        description: formData.description,
        // loc: parseInt(formData.distance),
      };
      setData((prevData) => [...prevData, newItem]);
    }
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleAddPress = () => {
    setEditingItem(null);
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ListItem>) => (
    <CardOrganism.CardList
      key={item.id}
      label={item.title}
      title={item.title}
      description={item.description}
      loc={1}
      onButtonPress={() => console.log(`Button pressed ${item.id}`)}
    />
  );

  return (
    <Container.Page>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button.FloatingBtn position="bottom-right" onPress={handleAddPress} />
      <Modal isOpen={isFormVisible} onClose={handleClose}>
        <Form.RequestPost
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          initialData={
            editingItem
              ? {
                  title: editingItem.title,
                  description: editingItem.description,
                  // distance: editingItem.loc.toString(),
                }
              : undefined
          }
        />
      </Modal>
    </Container.Page>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default List;
