import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function StarIcon({ width, height, isActive }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={isActive ? '#B31217' : '#525151'}
        d="M32.642 12.913c.16-.812-.48-1.787-1.28-1.787l-9.112-1.3-4.157-8.447c-.16-.325-.32-.488-.64-.65-.799-.487-1.758-.162-2.238.65L11.22 9.827l-9.113 1.3c-.48 0-.8.162-.96.487-.64.65-.64 1.624 0 2.274l6.555 6.498-1.599 9.26c0 .325 0 .65.16.975.48.813 1.44 1.137 2.239.65l8.153-4.386 8.154 4.386c.16.162.48.162.8.162h.32c.799-.162 1.438-.974 1.278-1.949l-1.599-9.26 6.555-6.498a.896.896 0 0 0 .48-.813Z"
      />
    </Svg>
  );
}

export default StarIcon;
