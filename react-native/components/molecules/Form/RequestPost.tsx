import React, { useState } from "react";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, Text } from "@/components/atoms";

interface RequestPostProps {
  onSubmit: (data: { title: string; description: string }) => void;
  onClose: () => void;
  initialData?: {
    title: string;
    description: string;
  };
}

const RequestPost: React.FC<RequestPostProps> = ({
  onSubmit,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
  });

  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleSubmit = () => {
    let hasErrors = false;

    if (formData.title.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        title: true,
      }));
      hasErrors = true;
    }

    if (formData.description.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        description: true,
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      onSubmit(formData);
      onClose();
    } else {
      Alert.alert("Veuillez remplir tous les champs correctement");
    }
  };

  return (
    <View style={styles.container}>
      <Text.TitleCard style={styles.title}>
        {initialData ? "Modifier la proposition" : "Faire une proposition"}
      </Text.TitleCard>
      <Input.TextInput
        placeholder="Label* : ex: Label"
        value={formData.title}
        onChangeText={(value) => handleChange("title", value)}
      />
      <Input.TextInput
        placeholder="Description* : ex: Lorem ipsum..."
        value={formData.description}
        onChangeText={(value) => handleChange("description", value)}
      />
      {/* TODO: add position input */}
      {/* TODO: add phone input */}
      {formErrors.title && <Text.Error>Nom invalide</Text.Error>}
      {formErrors.description && <Text.Error>Description invalide</Text.Error>}
      <Button.Global buttonStyle={styles.submitButton} onPress={handleSubmit}>
        <Text.Common style={styles.submitButtonText}>
          {initialData ? "Modifier" : "Ajouter"}
        </Text.Common>
      </Button.Global>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 35,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#e1e5f2",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#00afb9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
    padding: 5,
    zIndex: 1,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default RequestPost;
