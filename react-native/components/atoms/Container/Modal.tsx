import React from "react";
import {
  Modal as RNModal,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable, // Importation de ScrollView
} from "react-native";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <RNModal visible={isOpen} transparent animationType="fade">
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable
          style={styles.modalWrapper}
          onPress={(e) => e.preventDefault()}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Modal;
