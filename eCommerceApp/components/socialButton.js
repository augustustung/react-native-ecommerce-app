import React from 'react'
import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import { normalize, SCREEN_HEIGHT } from '../ultis/Dimentions'
import { ColorConst } from '../ultis/constant'

export default SocialButton = ({ onPress, title, source, marginBottom }) => {
    return (
        <TouchableOpacity style={[styles.container, { marginBottom: marginBottom ? marginBottom : 0 }]} onPress={onPress}>
            <Image source={source} style={styles.image} />

            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginHorizontal: normalize(16),
        height: SCREEN_HEIGHT * 0.0775,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderColor: ColorConst.NEUTRAL_LIGHT
    },
    image: {
        resizeMode: 'cover',
        width: normalize(57),
        height: normalize(57)
    },
    title: {
        color: ColorConst.NEUTRAL_GREY,
        textAlign: 'center',
        width: "75%",
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalize(25.2)
    }
})