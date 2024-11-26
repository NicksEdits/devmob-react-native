import React from "react";
import { Card } from ".";
import { RequestPostTypeFromDB } from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";

interface CardListProps {
  data: Array<RequestPostTypeFromDB>;
  onEditPress?: () => void;
  onButtonPress: () => void;
}

const CardList: React.FC<CardListProps> = ({ data, ...props }) => (
  <Container.Base>
    {data.map((item, index) => (
      <Card
        key={item.id}
        label={item.title}
        title={item.title}
        description={item.description}
        loc={1}
        onButtonPress={() => console.log(`Button pressed ${data[0].id}`)}
        onEditPress={props.onEditPress}
      />
    ))}
  </Container.Base>
);

export default CardList;
