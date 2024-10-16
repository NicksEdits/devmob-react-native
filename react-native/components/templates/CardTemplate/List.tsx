import React, {useState} from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Dimensions,
  Animated,
  View,
} from "react-native";
import { CardOrganism } from "@/components/organismes";
import ScrollView = Animated.ScrollView;
import { Button } from "@/components/atoms";

interface ListItem {
  id: string;
  label: string;
  title: string;
  description: string;
  loc: number;
}

interface ListProps {
  initialData: ListItem[];
}

const List: React.FC<ListProps> = ({ initialData }) => {
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState<ListItem[]>(initialData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);

  const handleFormSubmit = (formData: { label: string; username: string; description: string; distance: string }) => {
    if (editingItem) {
      // Modification d'un élément existant
      setData(prevData => prevData.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              label: formData.label, 
              title: formData.username, 
              description: formData.description, 
              loc: parseInt(formData.distance) 
            } 
          : item
      ));
    } else {
      // Ajout d'un nouvel élément
      const newItem: ListItem = {
        id: Date.now().toString(), // Générez un ID unique
        label: formData.label,
        title: formData.username,
        description: formData.description,
        loc: parseInt(formData.distance)
      };
      setData(prevData => [...prevData, newItem]);
    }
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleEditPress = (item: ListItem) => {
    setEditingItem(item);
    setIsFormVisible(true);
  };

  const handleAddPress = () => {
    setEditingItem(null);
    setIsFormVisible(true);
  };

  const renderItem = ({ item }: ListRenderItemInfo<ListItem>) => (
    <CardOrganism.CardList
      key={item.id}
      label={item.label}
      title={item.title}
      description={item.description}
      loc={item.loc}
      onButtonPress={() => console.log(`Button pressed ${item.id}`)}
      onEditPress={() => handleEditPress(item)}
    />
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button.FloatingBtn 
        onSubmit={handleFormSubmit} 
        isVisible={isFormVisible}
        setIsVisible={setIsFormVisible}
        initialData={editingItem ? {
          label: editingItem.label,
          username: editingItem.title,
          description: editingItem.description,
          distance: editingItem.loc.toString(),
        } : undefined}
        onAddPress={handleAddPress}
      />
    </>
  );
};

export default List;
