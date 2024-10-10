import {GestureResponderEvent, StyleSheet, View} from "react-native";
import React from "react";
import {Container, Text} from "@/components/atoms";
import {CardHeader} from "@/components/atoms/Container";

interface CardListProps {
  label: string;
  title: string;
  description: string;
}

const CardList: React.FC<CardListProps> = ({ label, title, description }) => (
  <Container.CardHeader style={styles.content}>
    <Text.LabelCard>{label}</Text.LabelCard>
    <Text.TitleCard>{title}</Text.TitleCard>
  </Container.CardHeader>

);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CardList;