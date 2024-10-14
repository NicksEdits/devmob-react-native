import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Container, Input, Text } from "@/components/atoms";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterForm: React.FC<Props> = ({ navigation }) => {
    const handleLogin = () => {
        console.log("Register button clicked!");
        navigation.navigate('Login');
    };
    return (
        <Container.Form style={styles.container}>
          <Input.Input placeholder="Adresse mail" />
          <Input.Input placeholder="Mot de passe" secureTextEntry />
          <Button.ButtonCard title="S'inscrire" onPress={() => console.log('Inscription coming soon....')} />
          <TouchableOpacity onPress={handleLogin}>
            <Text.DescriptionCard style={styles.loginText}>Se connecter</Text.DescriptionCard>
          </TouchableOpacity>
        </Container.Form>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    loginText: {
        fontSize: 14,
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

export default RegisterForm;