import { showMessage } from 'react-native-flash-message';

// eslint-disable-next-line import/prefer-default-export
export const showToast = (message, type) => {
  showMessage({
    message,
    type,
    floating: true,
    style: { marginTop: 30 },
  });
};
