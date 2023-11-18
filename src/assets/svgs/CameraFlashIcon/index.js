import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CameraFlashIcon({ width, height, fill }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={fill}
        d="M10.667 29.333V14.667l-2.667-4v-8h16v8l-2.667 4v14.666H10.667ZM16 20.667a1.929 1.929 0 0 1-1.417-.584A1.929 1.929 0 0 1 14 18.667c0-.556.194-1.028.583-1.417A1.929 1.929 0 0 1 16 16.667c.556 0 1.028.194 1.417.583.389.389.583.861.583 1.417 0 .555-.194 1.027-.583 1.416a1.929 1.929 0 0 1-1.417.584Zm-5.333-14h10.666V5.333H10.667v1.334Zm10.666 2.666H10.667v.534l2.666 4v12.8h5.334v-12.8l2.666-4v-.534Z"
      />
    </Svg>
  );
}

export default CameraFlashIcon;
