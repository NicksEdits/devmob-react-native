import { UserType } from "./UserType";

export interface RequestPostType {
  id: number;
  title: string;
  description: string;
  phone: string;
  user: UserType;
  position: {
    type: string;
    coordinates: number[];
  };
}

export interface RequestPostTypeForForm {
  title: string;
  description: string;
  phone: string;
}
