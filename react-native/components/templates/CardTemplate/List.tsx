import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Dimensions, Animated, View} from 'react-native';
import {CardOrganism} from "@/components/organismes";
import ScrollView = Animated.ScrollView;

interface ListItem {
  label: string;
  title: string;
  description: string;
  loc: number;
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
      loc={item.loc}
      onButtonPress={() => console.log(`Button pressed ${index}`)}
    />
  );

  return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

  );
};


export default List;