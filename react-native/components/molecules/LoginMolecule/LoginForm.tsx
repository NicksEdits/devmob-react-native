import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Container, Input, Text } from '@/components/atoms';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginForm: React.FC<Props> = ({ navigation }) => {
  const handleSignupPress = () => {
    navigation.navigate('Register');
  };    

  return (
    <Container.Form style={styles.container}>
      <Input.Input placeholder="Adresse mail" />
      <Input.Input placeholder="Mot de passe" secureTextEntry />
      <Button.ButtonCard title="Se connecter" onPress={() => console.log('Connexion coming soon....')} />
      <TouchableOpacity onPress={handleSignupPress}>
        <Text.DescriptionCard style={styles.signupText}>S'inscrire</Text.DescriptionCard>
      </TouchableOpacity>
    </Container.Form>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  signupText: {
    fontSize: 14,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default LoginForm;