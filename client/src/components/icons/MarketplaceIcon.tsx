import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface MarketplaceIcon {
  focused: boolean;
}

const MarketplaceIcon = ({ focused }) => {
  return (
    <Svg width="16" height="26" viewBox="0 0 19 33" fill="none">
      <G clip-path="url(#clip0_3149_20828)">
        <Path
          d="M16.2779 3.09705C14.482 1.17312 12.1027 0 9.50605 0C6.90942 0 4.53013 1.17312 2.73423 3.09705C-0.0454231 6.06506 -0.69744 10.5229 0.74386 14.359L6.01719 28.3896C6.73784 30.1141 7.27547 33 9.50605 33C11.8625 33 12.2743 30.1141 12.9949 28.3896L18.2682 14.359C19.7095 10.5229 19.0575 6.06506 16.2893 3.09705H16.2779ZM9.50605 13.8663C7.09245 13.8663 5.13639 11.7664 5.13639 9.1621C5.13639 6.55777 7.09245 4.45787 9.50605 4.45787C11.9197 4.45787 13.8757 6.55777 13.8757 9.1621C13.8757 11.7664 11.9197 13.8663 9.50605 13.8663Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3149_20828">
          <Rect width="19" height="33" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default MarketplaceIcon;
