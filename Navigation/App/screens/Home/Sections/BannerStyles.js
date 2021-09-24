import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT } from '../../../../../ultis/Dimentions'
import { normalize } from "../../../../../ultis/Dimentions";

export const styles = StyleSheet.create({
    container: {
        height: normalize(206),
        margin: normalize(16)
    },
    imageBg: {
        position: 'relative',
        height: '100%'
    },
    title: {
        fontSize: normalize(24),
        fontWeight: '700',
        color: "#fff",
        position: 'absolute',
        lineHeight: normalize(36),
        width: normalize(209),
        left: normalize(24),
        top: normalize(32),
        letterSpacing: 0.5
    },
    subTitle: {
        fontWeight: "400",
        fontSize: normalize(14),
        bottom: SCREEN_HEIGHT * 0.065,
        color: "#fff",
        position: 'absolute',
        left: normalize(24)
    },
    timeCount: {
        position: 'absolute',
        bottom: normalize(32),
        left: normalize(24),
        flexDirection: 'row'
    },
    square: {
        borderRadius: 5,
        width: normalize(41),
        height: normalize(41),
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeContent: {
        fontSize: normalize(16),
        fontWeight: '700',
        lineHeight: normalize(24),
        letterSpacing: 0.5
    },
    divide: {
        fontWeight: "700",
        lineHeight: normalize(21),
        fontSize: normalize(14),
        color: "#fff",
        top: 10
    }
})