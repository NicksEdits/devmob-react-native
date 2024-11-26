import React, { useEffect, useState } from "react";
import { RequestPostOrganism } from "@/components/organismes";
import { FormMolecule, ModalMolecule } from "@/components/molecules";
import { Button, Container } from "../atoms";
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [data, setData] = useState<RequestPostTypeFromDB[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: "John Doe",
        loc: 200,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: 2,
        title: "Jane Smith",
        loc: 200,
        description:
          "Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.",
      },
      {
        id: 3,
        title: "Jane Smith",
        loc: 200,
        description:
          "Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.",
      },
    ];
    setData(fakeData);
  }, []);

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
  }) => {
    console.log("Form data", formData);
    setIsFormVisible(false);
    setEditingItem(null);
  };

  const handleAddPress = () => {
    setEditingItem(null);
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  return (
    <Container.Page
      floatingElement={
        <Button.FloatingBtn position="bottom-right" onPress={handleAddPress} />
      }
    >
      <RequestPostOrganism.CardList
        data={data}
        onButtonPress={() => console.log("button")}
      />
      <ModalMolecule.Modal isOpen={isFormVisible} onClose={handleClose}>
        <FormMolecule.RequestPost
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          initialData={
            editingItem
              ? {
                  title: editingItem.title,
                  description: editingItem.description,
                  // distance: editingItem.loc.toString(),
                }
              : undefined
          }
        />
      </ModalMolecule.Modal>
    </Container.Page>
  );
};

export default List;
