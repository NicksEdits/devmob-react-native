import {GestureResponderEvent, StyleSheet, View} from "react-native";
import React from "react";
import {Container, Text} from "@/components/atoms";
import {CardHeader} from "@/components/atoms/Container";

interface CardListProps {
  label: string;
  title: string;
}

const CardList: React.FC<CardListProps> = ({ label, title }) => (
  <Container.CardHeader >
    <Text.LabelCard>{label}</Text.LabelCard>
    <Text.TitleCard>{title}</Text.TitleCard>
  </Container.CardHeader>

);


export default CardList;