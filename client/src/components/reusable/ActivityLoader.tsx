import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'native-base';
import {
    heightPercentageToDP as h,
    widthPercentageToDP as w
} from 'react-native-responsive-screen';

type ActivityLoaderProps = {
    size?: number;
    color?: string;
}

const ActivityLoader = ({ size, color }: ActivityLoaderProps) => {
    return (
        <View marginTop={h('2%')} justifyContent={'center'} alignItems={'center'}>
            <ActivityIndicator size={size ? size : 'small'} color={color ? color : '#000'} />
        </View>
    )
}

export default ActivityLoader;