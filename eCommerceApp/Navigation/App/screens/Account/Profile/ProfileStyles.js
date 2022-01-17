import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize, normalizeV } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    header: {
        marginTop: normalizeV(24),
        marginBottom: normalizeV(32),
        flexDirection: 'row'
    },
    wrapper: {
        marginLeft: normalize(16)
    },
    avatar: {
        width: SCREEN_WIDTH * 0.192,
        height: SCREEN_WIDTH * 0.192,
        borderRadius: 50,
        marginRight: normalize(16)
    },
    intro: {
        paddingVertical: normalizeV(13),
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    username: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21)
    },
    bio: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6)
    },
    iconLeft: {
        marginVertical: normalizeV(16),
        marginRight: normalize(16),
        width: normalize(24),
        height: normalize(24)
    },
    angleRight: {
        width: normalize(24),
        height: normalize(24)
    },
    contentRight: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH - normalize(32 + 24),
        flexDirection: 'row'
    },
    title: {
        marginTop: normalizeV(10),
        fontSize: normalize(12),
        fontWeight: "700",
        lineHeight: normalizeV(18),
        color: ColorConst.NEUTRAL_DARK
    },
    notice: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    infomation: {
        color: ColorConst.NEUTRAL_GREY,
        fontSize: normalize(12),
        fontWeight: '400',
        lineHeight: normalizeV(21.6),
        marginRight: normalize(16)
    },
})