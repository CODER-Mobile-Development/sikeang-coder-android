import { showMessage } from 'react-native-flash-message';

// eslint-disable-next-line import/prefer-default-export
export const showToast = (message, type, marginTop) => {
  showMessage({
    message,
    type,
    floating: true,
    style: {
      marginTop: marginTop || 0,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
    },
  });
};
