import React from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable, // Importation de ScrollView
} from "react-native";
import { Text } from "@/components/atoms";
import styled from "styled-components/native";

const StyledView = styled.View`
  background-color: ${(props) => props.theme.colors.containers.primary};
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <RNModal visible={isOpen} transparent animationType="fade">
    <KeyboardAvoidingView behavior="padding" style={styles.modalBackground}>
      <View style={styles.modalBackground}>
        <StyledView style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text.Common style={styles.closeText}>×</Text.Common>
          </Pressable>
          <ScrollView contentContainerStyle={styles.modalContent}>
            {children}
          </ScrollView>
        </StyledView>
      </View>
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
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
