import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { CardOrganism } from "..";
import { RequestPostTypeFromDB } from "@/interfaces/RequestPostType";

const renderItem = ({ item }: ListRenderItemInfo<RequestPostTypeFromDB>) => (
  <CardOrganism.Card
    key={item.id}
    label={item.title}
    title={item.title}
    description={item.description}
    loc={1}
    onButtonPress={() => console.log(`Button pressed ${item.id}`)}
  />
);

interface CardListProps {
  data: Array<RequestPostTypeFromDB>;
}

const CardList: React.FC<CardListProps> = ({ data }) => (
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id.toString()}
  />
);

export default CardList;
