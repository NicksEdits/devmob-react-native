import React from "react";
import { RequestPostTypeFromDB } from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";
import Card from '@/components/organismes/RequestPostOrganism/Card'

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
        loc={item.distance}
        onButtonPress={() => console.log(`Button pressed ${data[0].id}`)}
        onEditPress={props.onEditPress}
      />
    ))}
  </Container.Base>
);

export default CardList;
