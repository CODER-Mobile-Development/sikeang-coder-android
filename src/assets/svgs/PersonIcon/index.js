import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PersonIcon({ width, height, isActive }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={isActive ? '#B31217' : '#525151'}
        d="M16 16c-1.925 0-3.573-.685-4.944-2.056C9.686 12.573 9 10.925 9 9c0-1.925.685-3.573 2.056-4.944C12.427 2.686 14.075 2 16 2c1.925 0 3.573.685 4.944 2.056C22.314 5.427 23 7.075 23 9c0 1.925-.685 3.573-2.056 4.944C19.573 15.314 17.925 16 16 16ZM2 30v-4.9c0-.992.255-1.903.766-2.734A5.104 5.104 0 0 1 4.8 20.462a25.98 25.98 0 0 1 5.513-2.034A24.077 24.077 0 0 1 16 17.75c1.925 0 3.82.226 5.688.678a25.979 25.979 0 0 1 5.512 2.034 5.104 5.104 0 0 1 2.034 1.904c.51.83.766 1.742.766 2.734V30H2Zm3.5-3.5h21v-1.4c0-.32-.08-.613-.24-.875a1.703 1.703 0 0 0-.635-.613 22.815 22.815 0 0 0-4.769-1.771 20.303 20.303 0 0 0-9.712 0 22.816 22.816 0 0 0-4.769 1.771c-.263.146-.474.35-.634.613-.16.262-.241.554-.241.875v1.4Zm10.5-14c.962 0 1.787-.343 2.472-1.028S19.5 9.962 19.5 9c0-.963-.343-1.786-1.028-2.472C17.786 5.843 16.962 5.5 16 5.5c-.963 0-1.787.343-2.472 1.028C12.843 7.214 12.5 8.038 12.5 9c0 .963.343 1.787 1.028 2.472S15.038 12.5 16 12.5Z"
      />
    </Svg>
  );
}

export default PersonIcon;
