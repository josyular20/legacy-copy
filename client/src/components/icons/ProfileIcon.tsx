import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

interface ProfileIcon {
  focused: boolean;
}

const ProfileIcon = ({ focused }) => {
  return (
    <Svg width="26" height="26" viewBox="0 0 31 31" fill="none">
      <G clip-path="url(#clip0_3149_20839)">
        <Path
          d="M29.8075 30.1155C30.5686 30.1155 31.1651 29.3955 30.9389 28.6756C29.6018 24.582 23.2043 18.7605 15.4903 18.7605C7.77628 18.7605 1.3788 24.5614 0.041704 28.655C-0.184573 29.375 0.411976 30.0949 1.17309 30.0949H29.8075V30.1155Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
        <Path
          d="M15.4895 15.4691C19.7611 15.4691 23.224 12.0063 23.224 7.73457C23.224 3.46289 19.7611 0 15.4895 0C11.2178 0 7.75488 3.46289 7.75488 7.73457C7.75488 12.0063 11.2178 15.4691 15.4895 15.4691Z"
          fill={focused ? 'green' : '#2F1D12'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3149_20839">
          <Rect width="31" height="30.1155" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default ProfileIcon;
