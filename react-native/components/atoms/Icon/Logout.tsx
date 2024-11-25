import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
  size?: number;
  color?: string;
}

const Logout: React.FC<Props> = ({ size = 18, color = "red" }) => {
  return (
      <FontAwesomeIcon icon={faArrowRightFromBracket} size={size} color={color} />  
  );
};

export default Logout;

