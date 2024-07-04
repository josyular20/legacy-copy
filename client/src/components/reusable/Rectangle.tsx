import { View } from 'native-base';

import React from 'react';

export default function Rectangle() {
    return (
        <>
          <View
            height = {2}
            width={2}
            backgroundColor = 'white'
            
            // borderRadius={w('80%') / 2}
            borderColor={'white'}
            borderWidth={3}
          ></View>
        </>
    );
}