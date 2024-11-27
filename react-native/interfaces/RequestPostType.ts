export interface RequestPostType {
  phone: string
  id?: number;
  title: string;
  description: string;
  // loc: number;
}

export interface RequestPostTypeFromDB {
  id: number;
  title: string;
  description: string;
  // loc: number;
}
