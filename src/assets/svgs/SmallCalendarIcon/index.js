import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SmallCalendarIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={17}
      fill="none"
      {...props}
    >
      <Path
        fill="#414141"
        d="M13.6 2.102H12v-.8a.8.8 0 0 0-1.6 0v.8H5.6v-.8a.8.8 0 0 0-1.6 0v.8H2.4a2.4 2.4 0 0 0-2.4 2.4v9.6a2.4 2.4 0 0 0 2.4 2.4h11.2a2.4 2.4 0 0 0 2.4-2.4v-9.6a2.4 2.4 0 0 0-2.4-2.4Zm.8 12a.8.8 0 0 1-.8.8H2.4a.8.8 0 0 1-.8-.8v-5.6h12.8v5.6Zm0-7.2H1.6v-2.4a.8.8 0 0 1 .8-.8H4v.8a.8.8 0 0 0 1.6 0v-.8h4.8v.8a.8.8 0 0 0 1.6 0v-.8h1.6a.8.8 0 0 1 .8.8v2.4Z"
      />
    </Svg>
  );
}
export default SmallCalendarIcon;
