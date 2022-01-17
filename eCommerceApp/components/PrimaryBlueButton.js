import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '../ultis/Dimentions'
import { normalize } from '../ultis/Dimentions'

const PrimaryBlueButton = ({
    title,
    titleColor,
    onPress,
    backgroundColor,
    borderColor,
    marginBottom
}) => {
    return (
        <TouchableOpacity
            style={[styles.btn, {
                borderColor: borderColor ? borderColor : "#fff",
                borderWidth: borderColor ? 1 : 0,
                backgroundColor: backgroundColor ? backgroundColor : '#40BFFF',
                marginBottom: marginBottom ? marginBottom : 0
            }]}
            onPress={onPress}
        >
            <Text style={[styles.title, {
                color: titleColor ? titleColor : "#fff"
            }]}>{title}</Text>
        </TouchableOpacity>
    )
}
export default PrimaryBlueButton
const styles = StyleSheet.create({
    btn: {
        marginHorizontal: normalize(16),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        shadowColor: 'rgba(64, 191, 255, 0.24)',
        shadowOffset: { width: 0, height: 3 },
        height: SCREEN_HEIGHT * 0.0776,
        elevation: 5
    },
    title: {
        fontSize: normalize(14),
        fontWeight: '700',
        lineHeight: normalize(25.2)
    }
})
