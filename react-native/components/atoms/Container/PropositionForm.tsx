import React, {useState, useEffect} from 'react';
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
    label: '',
    username: '',
    description: '',
    distance: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if(Object.values(formData).every(value => value.trim() !== '')) {
        onSubmit(formData);
        onClose();
    } else {
        Alert.alert('Tous les champs sont obligatoires');
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
            style={styles.input}
            placeholder="Label*"
            value={formData.label}
            onChangeText={(value) => handleChange('label', value)}
        />
        <TextInput
            style={styles.input}
            placeholder="Username*"
            value={formData.username}
            onChangeText={(value) => handleChange('username', value)}
        />
        <TextInput
            style={styles.input}
            placeholder="Description*"
            value={formData.description}
            onChangeText={(value) => handleChange('description', value)}
        />
        <TextInput
            style={styles.input}
            placeholder="Distance*"
            value={formData.distance}
            onChangeText={(value) => handleChange('distance', value)}
            keyboardType="numeric"
        />
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
    // height: 300,
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
    // width: 24,
    // height: 24,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default PropositionForm;