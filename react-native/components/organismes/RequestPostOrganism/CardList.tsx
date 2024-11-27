import React from "react";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { Container } from "@/components/atoms";
import Card from "@/components/organismes/RequestPostOrganism/Card";
import { View } from 'react-native'

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
  <Container.Base style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
    {data.map((item, index) => (
      <Card data={item} mine={mine} {...props} />
    ))}
  </Container.Base>
);

export default CardList;
