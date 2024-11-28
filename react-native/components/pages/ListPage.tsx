import React, { useEffect, useState } from "react";
import { RequestPostOrganism } from "@/components/organismes";
import { FormMolecule, ModalMolecule } from "@/components/molecules";
import { Button, Container, Icon, Text } from "@/components/atoms";
import { RequestPostType } from "@/interfaces/RequestPostType";
import * as Location from "expo-location";
import { get, post } from "@/utils/api";
import { router, useFocusEffect } from "expo-router";
import { useToast } from "react-native-toast-notifications";

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [data, setData] = useState<RequestPostType[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const toast = useToast();

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }
  function getPostsByMyLocation() {
    get(
      `request-posts?lat=${location.coords.latitude}&long=${location.coords.longitude}`
    )
      .catch((err) => {
        toast.show("Quelque chose s'est mal passé", {
          type: "danger",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
      })
      .then((res) => {
        setData(res);
      });
  }

  function CreatePostsByMyLocation(
    lat: number,
    long: number,
    title: string,
    description: string,
    phone: string
  ) {
    post(`request-posts`, { lat, long, title, description, phone })
      .catch((err) => {
        if (err.status === 401) {
          toast.show("Vous devez être connecté pour créer une annonce", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        } else {
          toast.show("Quelque chose s'est mal passé", {
            type: "danger",
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
        }
      })
      .then((res) => {
        toast.show("Le poste a bien été créé", {
          type: "succes",
          placement: "top",
          duration: 3000,
          animationType: "slide-in",
        });
        router.push(`/posts/${res.id}`);
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      getCurrentLocation(); // Appeler getPostsMe à chaque fois que la page est en focus
    }, [])
  );

  useEffect(() => {
    if (location?.coords.latitude && location?.coords.longitude) {
      getPostsByMyLocation();
    }
  }, [location]);

  const handleFormSubmit = (formData: {
    title: string;
    description: string;
    phone: string;
  }) => {
    if (location?.coords.latitude && location?.coords.longitude) {
      CreatePostsByMyLocation(
        location?.coords.latitude,
        location?.coords.longitude,
        formData.title,
        formData.description,
        formData.phone
      );
    }
    setIsFormVisible(false);
  };

  const handleAddPress = () => {
    setIsFormVisible(true);
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  return (
    <Container.Page
      floatingElement={
        <Button.FloatingBtn position="bottom-right" onPress={handleAddPress}>
          <Icon.Add size={40} color="white" />
        </Button.FloatingBtn>
      }
    >
      {/*{location?.coords.latitude && location?.coords.longitude && (*/}
      {/*  <Text.Common>*/}
      {/*    {location.coords.latitude} {location.coords.longitude}*/}
      {/*  </Text.Common>*/}
      {/*)}*/}
      <RequestPostOrganism.CardList data={data} />

      <ModalMolecule.Modal isOpen={isFormVisible} onClose={handleClose}>
        <FormMolecule.RequestPost onSubmit={handleFormSubmit} />
      </ModalMolecule.Modal>
    </Container.Page>
  );
};

export default List;
