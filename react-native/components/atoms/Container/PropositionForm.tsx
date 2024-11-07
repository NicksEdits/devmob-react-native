import React, {useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Text } from "@/components/atoms";

interface PropositionFormProps {
  onSubmit: (data: { label: string; username: string; description: string; distance: string }) => void;
  onClose: () => void;
  initialData?: { label: string; username: string; description: string; distance: string };
}

const PropositionForm: React.FC<PropositionFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    label: initialData?.label || '',
    username: initialData?.username || '',
    description: initialData?.description || '',
    distance: initialData?.distance || '',
  });

  const [formErrors, setFormErrors] = useState({
    label: false,
    username: false,
    description: false,
    distance: false,
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const handleSubmit = () => {
    let hasErrors = false;

    if (formData.label.trim() === '') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        label: true,
      }));
      hasErrors = true;
    }

    if (formData.username.trim() === '') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        username: true,
      }));
      hasErrors = true;
    }

    if (formData.description.trim() === '') {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        description: true,
      }));
      hasErrors = true;
    }

    if (!/^\d{1,4}$/.test(formData.distance)) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        distance: true,
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      onSubmit(formData);
      onClose();
    } else {
      Alert.alert('Veuillez remplir tous les champs correctement');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesomeIcon icon={faCircleXmark} size={18} color="#00afb9" />
      </TouchableOpacity>
      <Text.TitleCard style={styles.title}>
        {initialData ? "Modifier la proposition" : "Faire une proposition"}
      </Text.TitleCard>
      <TextInput
        style={[
          styles.input,
          formErrors.label && styles.inputError,
        ]}
        placeholder="Label* : ex: Label"
        value={formData.label}
        onChangeText={(value) => handleChange('label', value)}
      />
      <TextInput
        style={[
          styles.input,
          formErrors.username && styles.inputError,
        ]}
        placeholder="Username* : ex: Toto"
        value={formData.username}
        onChangeText={(value) => handleChange('username', value)}
      />
      <TextInput
        style={[
          styles.input,
          formErrors.description && styles.inputError,
        ]}
        placeholder="Description* : ex: Lorem ipsum..."
        value={formData.description}
        onChangeText={(value) => handleChange('description', value)}
      />
      <TextInput
        style={[
          styles.input,
          formErrors.distance && styles.inputError,
        ]}
        placeholder="Distance* : ex: 100"
        value={formData.distance}
        onChangeText={(value) => handleChange('distance', value)}
        keyboardType="numeric"
      />
      {formErrors.distance && (
        <Text.DescriptionCard style={styles.errorText}>
          Distance invalide
        </Text.DescriptionCard>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text.DescriptionCard style={styles.submitButtonText}>
          {initialData ? "Modifier" : "Ajouter"}
        </Text.DescriptionCard>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#e1e5f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#00afb9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    padding: 5,
    zIndex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default PropositionForm;