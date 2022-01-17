import React from 'react'
import { StyleSheet, View } from 'react-native'
import { normalize } from '../ultis/Dimentions'

const Notificate = ({ contentLeft, contentRight }) => {
    return (
        <View style={styles.container}>
            {contentLeft()}
            {contentRight()}
        </View>
    )
}

export default Notificate

const styles = StyleSheet.create({
    container: {
        marginHorizontal: normalize(16),
        flexDirection: 'row'
    }
})
