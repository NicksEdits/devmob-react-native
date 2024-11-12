import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: IconDefinition | IconProp;
  size?: number;
  color?: string;
}

const FontAwesome: React.FC<Props> = ({ icon, size = 16, color = "#000" }) => (
  <FontAwesomeIcon icon={icon} size={size} color={color} />
);

export default FontAwesome;
