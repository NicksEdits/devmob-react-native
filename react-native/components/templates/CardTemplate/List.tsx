import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Dimensions, Animated, View} from 'react-native';
import {CardOrganism} from "@/components/organismes";
import ScrollView = Animated.ScrollView;

interface ListItem {
  label: string;
  title: string;
  description: string;
}

interface ListProps {
  data: ListItem[];
}

const List: React.FC<ListProps> = ({ data }) => {
  const screenHeight = Dimensions.get('window').height;

  const renderItem = ({ item, index }: ListRenderItemInfo<ListItem>) => (
    <CardOrganism.CardList
      key={index}
      label={item.label}
      title={item.title}
      description={item.description}
      onButtonPress={() => console.log(`Button pressed ${index}`)}
    />
  );

  const getItemLayout = (_data: ListItem[] | null | undefined, index: number) => ({
    length: 120, // Estimation de la hauteur d'une carte (modifiez selon vos besoins)
    offset: 120 * index,
    index,
  });

  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

  );
};


export default List;