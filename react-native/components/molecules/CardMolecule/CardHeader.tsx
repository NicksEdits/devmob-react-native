import React from "react";
import { Container, Text } from "@/components/atoms";

interface CardHeaderProps {
  label: string;
  title: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ label, title }) => (
  <Container.CardHeader>
    <Text.LabelCard>{label}</Text.LabelCard>
    <Text.TitleCard>{title}</Text.TitleCard>
  </Container.CardHeader>
);

export default CardHeader;
