import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../Navigation/App/screens/Home/Sections/sectionStyles'

function ButtonTag({ title, btnTitle, OnPress }) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TouchableOpacity onPress={OnPress}>
                <Text style={styles.btnTitle}>{btnTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonTag
