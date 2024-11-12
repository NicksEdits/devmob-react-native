import React from "react";
import {
  Modal as RNModal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Container } from "@/components/atoms";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <RNModal visible={isOpen} transparent animationType="fade">
    <Container.Base style={styles.modalBackground}>
      <Container.Base style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
        <Container.Base style={styles.modalContent}>{children}</Container.Base>
      </Container.Base>
    </Container.Base>
  </RNModal>
);

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
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
