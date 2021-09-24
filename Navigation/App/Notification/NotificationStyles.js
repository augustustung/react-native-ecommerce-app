import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, normalize, normalizeV } from '../../../ultis/Dimentions'
import { ColorConst } from '../../../ultis/constant'

export const styles = StyleSheet.create({
    iconLeft: {
        marginTop: normalize(16),
        marginRight: normalize(16),
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064
    },
    imageLeft: {
        width: normalize(48),
        height: normalize(48),
        borderRadius: 5,
        marginRight: normalize(16),
        marginTop: normalizeV(16)
    },
    contentRight: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH - normalize(32) - normalize(16) - normalize(24),
        flexDirection: 'row',
        height: normalizeV(56)
    },
    subTitleRight: {
        flex: 1
    },
    title: {
        marginTop: normalizeV(10),
        fontSize: normalize(12),
        fontWeight: "700",
        lineHeight: normalize(18),
        color: ColorConst.NEUTRAL_DARK
    },
    subTitle: {
        fontSize: normalize(12),
        fontWeight: "400",
        lineHeight: normalize(21.6),
        marginBottom: normalize(8),
        color: ColorConst.NEUTRAL_GREY,
        width: '100%',
        letterSpacing: 0.5
    },
    time: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '400',
        fontSize: normalize(10),
        lineHeight: normalize(15),
        marginBottom: 16
    },
    notice: {
        borderRadius: 50,
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_WIDTH * 0.053,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorConst.PRIMARY_RED,
    },
    noticeNum: {
        color: '#fff',
        fontSize: normalize(10),
        fontWeight: '700',
        lineHeight: normalize(15)
    }
})