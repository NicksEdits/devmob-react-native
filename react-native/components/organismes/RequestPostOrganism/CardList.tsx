import React from "react";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";
import Card from "@/components/organismes/RequestPostOrganism/Card";

interface CardListProps {
  data: Array<RequestPostType>;
  mine?: boolean;
  onEditPress?: () => void;
}

const CardList: React.FC<CardListProps> = ({
  data,
  mine = false,
  ...props
}) => (
  <Container.Base style={{ width: "100%" }}>
    {data.map((item, index) => (
      <Card
        key={item.id}
        data={item}
        onEditPress={props.onEditPress}
        mine={mine}
      />
    ))}
  </Container.Base>
);

export default CardList;
