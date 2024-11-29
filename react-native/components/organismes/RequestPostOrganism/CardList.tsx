import React, { useEffect, useState } from "react";
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
}) => {
  const [dataList, setDataList] = useState<RequestPostType[]>(data);

  useEffect(() => {
    setDataList(data);
  }, [data]);

  const onDeleted = (id: number) => {
    setDataList(dataList.filter((item) => item.id !== id));
  };

  return (
    <Container.Base
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {dataList.map((item) => (
        <Card
          key={item.id}
          data={item}
          mine={mine}
          {...props}
          deleted={() => onDeleted(item.id)}
        />
      ))}
      {dataList.length === 0 && (
        <Container.Base>
          <Common style={{ textAlign: "center" }}>Aucune demande</Common>
        </Container.Base>
      )}
    </Container.Base>
  );
};

export default CardList;
