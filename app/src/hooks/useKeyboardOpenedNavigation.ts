import {Keyboard} from 'react-native';

export const useKeyboardOpenedNavigation = () => {
  const keyboardWrapperOnPress = (onHide: () => void) => {
    Keyboard.dismiss();
    setTimeout(() => {
      onHide();
    }, 0);
  };

  return {keyboardWrapperOnPress};
};
