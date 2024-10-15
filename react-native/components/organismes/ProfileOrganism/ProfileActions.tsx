import React, {useState} from 'react';
import Base from "@/components/atoms/Container/Base";
import {Button, Text} from "@/components/atoms";
import Modal from "@/components/atoms/Container/Modal";
import {TextInput} from "react-native";
import {Input} from "@/components/atoms/Input";

interface ProfileActionsProps {
  onEditUsername: (value : string) => void;
  onChangePassword: (value : string) => void;
}



const ProfileActions: React.FC<ProfileActionsProps> = ({ onEditUsername, onChangePassword }) => {
  const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [username, setUsername] = useState('Username');
  const [password, setPassword] = useState('');

  const openEditUsernameModal = () => setIsEditUsernameModalOpen(true);
  const closeEditUsernameModal = () => setIsEditUsernameModalOpen(false);

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  const handleSaveUsername = (newUsername: string) => {
    onEditUsername(newUsername);
    closeEditUsernameModal();
  };

  const handleSavePassword = (newPassword: string) => {
    onChangePassword(newPassword);
    closeChangePasswordModal();
  }





  return (

    <Base>
      <Button.ButtonCard title="Modifier le nom d'utilisateur" onPress={openEditUsernameModal} />
      <Button.ButtonCard title="Modifier le mot de passe" onPress={openChangePasswordModal} />

      <Modal isOpen={isEditUsernameModalOpen} onClose={closeEditUsernameModal}>
        <Text.LabelCard style={{padding: 10}}>Modifier le nom d'utilisateur</Text.LabelCard>
        <Input onChangeText={setUsername}
          placeholder="Nouveau nom d'utilisateur"
          // onChangeText={setUsername}
          value={username}
        />
        <Button.ButtonCard title="Sauvegarder" onPress={() => {
          handleSaveUsername(username);
        }} />
      </Modal>

      <Modal isOpen={isChangePasswordModalOpen} onClose={closeChangePasswordModal}>
        <Text.LabelCard style={{padding: 10}}>Modifier le mot de passe</Text.LabelCard>
        <Input onChangeText={setPassword}  placeholder="Nouveau mot de passe" secureTextEntry  />
        <Button.ButtonCard title="Sauvegarder" onPress={()=> {
          handleSavePassword(password);
        }} />
      </Modal>
    </Base>
  );
};

export default ProfileActions;