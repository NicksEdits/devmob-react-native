import React, { useState } from "react";
import { Container, Button, Text } from "@/components/atoms";
import { ModalMolecule } from "@/components/molecules";
import { Input } from "@/components/atoms";

interface ProfileActionsProps {
  onEditUsername: (value: string) => void;
  onChangePassword: (
    oldPassword: string,
    newPassword: string,
    confPassword: string
  ) => void;
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
    <Container.Base>
      <Container.Base>
        <Button.Global onPress={openEditUsernameModal}>
          <Text.Button>Modifier le nom d'utilisateur</Text.Button>
        </Button.Global>
      </Container.Base>
      <Container.Base>
        <Button.Global onPress={openChangePasswordModal}>
          <Text.Button>Modifier le mot de passe</Text.Button>
        </Button.Global>
      </Container.Base>

      <ModalMolecule.Modal
        isOpen={isEditUsernameModalOpen}
        onClose={closeEditUsernameModal}
      >
        <Text.LabelCard style={{ padding: 10 }}>
          Modifier le nom d'utilisateur
        </Text.LabelCard>
        <Input.TextInput
          onChangeText={setUsername}
          placeholder="Nouveau nom d'utilisateur"
          // onChangeText={setUsername}
          value={username}
        />
        <Button.Global
          onPress={() => {
            handleSaveUsername(username);
          }}
        >
          <Text.Button>Sauvegarder</Text.Button>
        </Button.Global>
      </ModalMolecule.Modal>

      <ModalMolecule.Modal
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
        <Button.Global
          onPress={() => {
            handleSavePassword(oldPassword, newPassword, confPassword);
          }}
        >
          <Text.Button>Sauvegarder</Text.Button>
        </Button.Global>
      </ModalMolecule.Modal>
    </Container.Base>
  );
};

export default ProfileActions;
