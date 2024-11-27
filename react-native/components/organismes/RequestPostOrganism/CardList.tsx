import React from "react";
import { RequestPostType } from "@/interfaces/RequestPostType";
import Card from "@/components/organismes/RequestPostOrganism/Card";
import { View } from "react-native";
import Common from "@/components/atoms/Text/Common";
import { Container } from "@/components/atoms";

interface CardListProps {
  data: Array<RequestPostType>;
  mine?: boolean;
  reload?: () => void;
}

const CardList: React.FC<CardListProps> = ({
  data,
  mine = false,
  reload,
  ...props
}) => (
  <Container.Base
    style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}
  >
    {data.map((item) => (
      <Card key={item.id} data={item} mine={mine} {...props} reload={reload} />
    ))}
    {data.length === 0 && (
      <Container.Base>
        <Common style={{ textAlign: "center" }}>Aucune demande</Common>
      </Container.Base>
    )}
  </Container.Base>
);

export default CardList;
