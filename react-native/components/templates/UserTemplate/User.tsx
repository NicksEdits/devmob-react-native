import React, {useState} from 'react';
import {ImageSourcePropType, SafeAreaView, View} from "react-native";
import {CardHeader} from "@/components/atoms/Container";
import Image from "@/components/atoms/Image";
import {CardMolecule} from "@/components/molecules";
import {Container} from "@/components/atoms";
import Base from "@/components/atoms/Container/Base";
import ProfileActions from "@/components/organismes/ProfileOrganism/ProfileActions";
import {ProfileCard} from "@/components/molecules/ProfileMolecule";



const User = () => {
  const [username, setUsername] = useState('Username');

  return (
    // <SafeAreaView style={styles.safeArea}>
      <Base>
        <ProfileCard username={username} src={"https://profilepictures.socratic.org/nXY7kdi5QymgeGu7uEqB_default-male-avatar-profile-picture-icon-grey-man-photo-placeholder-vector-illustration-88414414.jpg"}  />
        <ProfileActions
          onEditUsername={(value : string)=>{
            setUsername(value);
          }}
          onChangePassword={(value : string)=>{
            console.log(value);
          }}
        />
      </Base>
    // </SafeAreaView>
  );
};

export default User;