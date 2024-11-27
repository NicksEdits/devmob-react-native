import React from "react";
import { StyleSheet } from "react-native";
import { RequestPostType } from "@/interfaces/RequestPostType";
import { Button, Container, Text } from "@/components/atoms";
import { ModalMolecule } from "@/components/molecules";
import { Link } from "expo-router";

interface ContactButtonProps {
  post: RequestPostType;
  color?: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({ post, color }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Container.View>
      <ModalMolecule.Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Container.Base>
          <Text.Bold>Contacter {post.user.username}</Text.Bold>
        </Container.Base>
        <Container.Base>
          <Link href={`tel:${post.phone}`}>
            <Text.Common>{post.phone}</Text.Common>
          </Link>
        </Container.Base>
      </ModalMolecule.Modal>
      <Button.Global
        onPress={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
        buttonStyle={styles.btnCard}
      >
        <Text.Button>Contacter</Text.Button>
      </Button.Global>
    </Container.View>
  );
};

const styles = StyleSheet.create({
  btnCard: {
    backgroundColor: "#000",
  },
});

export default ContactButton;
