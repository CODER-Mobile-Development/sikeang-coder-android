import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BackButton({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill="#000"
        d="M-1.06 10.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L2.12 12l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L-1.06 10.94Zm25.247-.44H0v3h24.187v-3Z"
        opacity={0.4}
      />
    </Svg>
  );
}

export default BackButton;
