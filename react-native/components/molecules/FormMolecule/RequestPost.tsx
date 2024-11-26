import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button, Container, Input, Text } from "@/components/atoms";

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
    <Container.Form>
      <Text.Bold style={styles.title}>
        {initialData ? "Modifier la proposition" : "Faire une proposition"}
      </Text.Bold>
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
      <Button.Global onPress={handleSubmit}>
        <Text.Button>{initialData ? "Modifier" : "Ajouter"}</Text.Button>
      </Button.Global>
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 35,
    textAlign: "center",
  },
});

export default RequestPost;
