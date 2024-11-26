import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView, KeyboardAvoidingView,  // Importation de ScrollView
} from 'react-native'
import { Container } from "@/components/atoms";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <RNModal visible={isOpen} transparent animationType="fade">
    <KeyboardAvoidingView behavior="padding" style={styles.modalBackground}>
    <Container.Base style={styles.modalBackground}>
      <Container.Base style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {children}
        </ScrollView>
      </Container.Base>
    </Container.Base>
    </KeyboardAvoidingView>
  </RNModal>
);

const styles = StyleSheet.create({
  modalContent: {
    paddingBottom: 20, // Ajoute un peu de marge au bas pour ne pas avoir d'éléments collés au bas
  },
  modalBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  closeText: {
    fontSize: 20,
  },
});

export default Modal;