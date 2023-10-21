import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ChevronUp({ width, height }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill="#000"
        d="M8.397.618a1.625 1.625 0 0 1 1.153.472l6.5 6.5a1.632 1.632 0 1 1-2.307 2.307L8.397 4.535 3.05 9.88A1.625 1.625 0 0 1 .76 7.59l6.5-6.5c.302-.3.71-.47 1.137-.472Z"
      />
    </Svg>
  );
}

export default ChevronUp;
