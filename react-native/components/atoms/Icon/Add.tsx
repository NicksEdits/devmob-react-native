import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  size?: number;
  color?: string;
}

const Edit: React.FC<Props> = ({ size = 16, color = "#000" }) => (
  <Ionicons
    style={{ position: "absolute" }}
    name="add"
    size={size}
    color={color}
  />
);

export default Edit;
