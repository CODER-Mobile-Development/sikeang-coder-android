import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronDown() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={11}
      fill="none"
    >
      <Path
        fill="#000"
        d="M8.5 10.375a1.627 1.627 0 0 1-1.154-.471l-6.5-6.5a1.632 1.632 0 1 1 2.308-2.308L8.5 6.46l5.346-5.346a1.625 1.625 0 0 1 2.292 2.29l-6.5 6.5c-.303.301-.712.47-1.138.472Z"
      />
    </Svg>
  );
}

export default ChevronDown;
