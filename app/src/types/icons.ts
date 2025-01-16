import FontAwesomeIcons from 'react-native-vector-icons/glyphmaps/FontAwesome.json';
import MaterialIcons from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';

type Icons = keyof typeof MaterialIcons | keyof typeof FontAwesomeIcons;

export {type Icons as AppIconsType};
