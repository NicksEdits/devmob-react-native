import React, { useState } from "react";
import Base from "@/components/atoms/Container/Base";
import { Button, Text } from "@/components/atoms";
import Modal from "@/components/atoms/Container/Modal";
import { Input } from "@/components/atoms";

interface ProfileActionsProps {
  onEditUsername: (value: string) => void;
  onChangePassword: (oldPassword: string, newPassword: string, confPassword: string) => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEditUsername,
  onChangePassword,
}) => {
  const [isEditUsernameModalOpen, setIsEditUsernameModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [username, setUsername] = useState("Username");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const openEditUsernameModal = () => setIsEditUsernameModalOpen(true);
  const closeEditUsernameModal = () => setIsEditUsernameModalOpen(false);

  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);
  const closeChangePasswordModal = () => setIsChangePasswordModalOpen(false);

  const handleSaveUsername = (newUsername: string) => {
    onEditUsername(newUsername);
    closeEditUsernameModal();
  };

  const handleSavePassword = (
    oldPassword: string,
    newPassword: string,
    confPassword: string
  ) => {
    onChangePassword(oldPassword, newPassword, confPassword);
    closeChangePasswordModal();
  };

  return (
    <Base>
      <Button.Text
        text="Modifier le nom d'utilisateur"
        onPress={openEditUsernameModal}
      />
      <Button.Text
        text="Modifier le mot de passe"
        onPress={openChangePasswordModal}
      />

      <Modal isOpen={isEditUsernameModalOpen} onClose={closeEditUsernameModal}>
        <Text.LabelCard style={{ padding: 10 }}>
          Modifier le nom d'utilisateur
        </Text.LabelCard>
        <Input.TextInput
          onChangeText={setUsername}
          placeholder="Nouveau nom d'utilisateur"
          // onChangeText={setUsername}
          value={username}
        />
        <Button.ButtonCard
          title="Sauvegarder"
          onPress={() => {
            handleSaveUsername(username);
          }}
        />
      </Modal>

      <Modal
        isOpen={isChangePasswordModalOpen}
        onClose={closeChangePasswordModal}
      >
        <Text.LabelCard style={{ padding: 10 }}>
          Modifier le mot de passe
        </Text.LabelCard>
        <Input.TextInput
          onChangeText={setOldPassword}
          placeholder="Ancien mot de passe"
          secureTextEntry
        />
        <Input.TextInput
          onChangeText={setNewPassword}
          placeholder="Nouveau mot de passe"
          secureTextEntry
        />
        <Input.TextInput
          onChangeText={setConfPassword}
          placeholder="Confirmation"
          secureTextEntry
        />
        <Button.ButtonCard
          title="Sauvegarder"
          onPress={() => {
            handleSavePassword(oldPassword, newPassword, confPassword);
          }}
        />
      </Modal>
    </Base>
  );
};

export default ProfileActions;
