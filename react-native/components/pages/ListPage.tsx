import React, { useEffect, useState } from "react";
import { RequestPostOrganism } from "@/components/organismes";
import { FormMolecule, ModalMolecule } from "@/components/molecules";
import { Button, Container, Text } from '../atoms'
import {
  RequestPostType,
  RequestPostTypeFromDB,
} from "@/interfaces/RequestPostType";
import * as Location from 'expo-location';
import { get, patch, post } from '@/utils/api'
import { setUser } from '@/store/auth'
import { useFocusEffect } from 'expo-router'

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [data, setData] = useState<RequestPostTypeFromDB[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<RequestPostType | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);




    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    function getPostsByMyLocation() {
      get(`request-posts?lat=${location.coords.latitude}&long=${location.coords.longitude}`,  )
        .catch((err) => {{}
          // TODO: toast
        })
        .then((res) => {
          setData(res);
          console.log(res);
          console.log("User updated");
        });
    }

  function CreatePostsByMyLocation(lat: number, long: number, title: string, description: string, phone: string) {
    post(`request-posts`,  {lat, long, title, description, phone}  )
      .catch((err) => {{}
        // TODO: toast
      })
      .then((res) => {
        //toast
        // redirect ton the post
        console.log(res);
        console.log("User updated");
      });
  }
  

  useFocusEffect(
    React.useCallback(() => {
      getCurrentLocation();// Appeler getPostsMe à chaque fois que la page est en focus
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
    console.log("Form data", formData);
    if(location?.coords.latitude && location?.coords.longitude) {
      CreatePostsByMyLocation(location?.coords.latitude, location?.coords.longitude, formData.title, formData.description, formData.phone);
    } else {
      console.log("No location");
    }
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
      <Text.Common>
        {location?.coords.latitude} {location?.coords.longitude}
      </Text.Common>
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
                  phone: editingItem.phone,
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
