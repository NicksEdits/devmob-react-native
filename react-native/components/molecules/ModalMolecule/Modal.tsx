import React from "react";
import {
  StyleSheet,
  ScrollView,
  Pressable, // Importation de ScrollView
} from "react-native";
import { Container, Text } from "@/components/atoms";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <Container.Modal isOpen={isOpen} onClose={onClose}>
    <Container.Background style={styles.modalContainer}>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text.Common style={styles.closeText}>×</Text.Common>
      </Pressable>
      <ScrollView contentContainerStyle={styles.modalContent}>
        {children}
      </ScrollView>
    </Container.Background>
  </Container.Modal>
);

const styles = StyleSheet.create({
  modalContent: {
    paddingBottom: 20, // Ajoute un peu de marge au bas pour ne pas avoir d'éléments collés au bas
  },
  modalContainer: {
    width: "85%",
    padding: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 10,
    zIndex: 1000,
  },
  closeText: {
    fontSize: 30,
  },
});

export default Modal;
