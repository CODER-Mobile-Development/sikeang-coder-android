import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function HomeIcon({ width, height, isActive }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={isActive ? '#B31217' : '#525151'}
        d="M11.478 29.905v-4.856c0-1.23 1-2.23 2.24-2.238h4.55a2.246 2.246 0 0 1 2.254 2.238v4.842a1.95 1.95 0 0 0 1.943 1.942h3.104a5.478 5.478 0 0 0 3.869-1.582 5.399 5.399 0 0 0 1.604-3.837V12.621c0-1.163-.52-2.266-1.418-3.012L19.076 1.234a4.933 4.933 0 0 0-6.266.113L2.49 9.609A3.918 3.918 0 0 0 .957 12.62V26.4c0 3 2.45 5.432 5.473 5.432h3.033a1.95 1.95 0 0 0 1.383-.56 1.92 1.92 0 0 0 .574-1.368h.057Z"
      />
    </Svg>
  );
}
export default HomeIcon;
