import { faPen } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "./FontAwesome";

interface Props {
  size?: number;
  color?: string;
}

const Edit: React.FC<Props> = ({ size = 16, color = "#000" }) => (
  <FontAwesome icon={faPen} size={size} color={color} />
);

export default Edit;
