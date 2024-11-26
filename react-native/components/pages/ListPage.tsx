import React, { useState } from "react";
import { RequestPostOrganism } from "@/components/organismes";
import { FormMolecule, ModalMolecule } from "@/components/molecules";
import { Button, Container } from "../atoms";
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";

interface ListProps {
  initialData: RequestPostTypeFromDB[];
}

const List: React.FC<ListProps> = ({ initialData }) => {
  const [data, setData] = useState<RequestPostTypeFromDB[]>(initialData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
  }) => {
    // if (editingItem) {
    //   // Modification d'un élément existant
    //   setData((prevData) =>
    //     prevData.map((item) =>
    //       item.id === editingItem.id
    //         ? {
    //             ...item,
    //             title: formData.title,
    //             description: formData.description,
    //             // loc: parseInt(formData.distance),
    //           }
    //         : item
    //     )
    //   );
    // } else {
    //   // Ajout d'un nouvel élément
    //   const newItem: RequestPostType = {
    //     title: formData.title,
    //     description: formData.description,
    //     // loc: parseInt(formData.distance),
    //   };
    //   setData((prevData) => [...prevData, newItem]);
    // }
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
