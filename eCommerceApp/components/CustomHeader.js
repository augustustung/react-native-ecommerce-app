import React from 'react'
import {
    View
} from 'react-native'
import { styles } from '../Navigation/App/screens/Home/HomeScreen/HomeScreenStyle'

function CustomHeader({ headerLeft, headerRight }) {
    return (
        <View style={styles.container}>
            {headerLeft()}


            {headerRight && headerRight()}
        </View>
    )

}

export default CustomHeader
