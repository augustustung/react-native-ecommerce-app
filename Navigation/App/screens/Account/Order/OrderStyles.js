import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize, normalizeV } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: normalize(16)
    },
    title: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '800',
        fontSize: normalize(14),
        lineHeight: normalizeV(21.6),
        marginLeft: normalize(16),
        marginTop: normalizeV(24)
    },
    item: {
        marginHorizontal: normalize(16),
        marginTop: normalize(16),
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        borderRadius: 5,
        padding: normalize(16)
    },
    id: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        marginBottom: normalizeV(12)
    },
    text: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '400',
        fontSize: normalize(14),
        lineHeight: normalizeV(21.6),
        marginBottom: normalizeV(12)
    },
    divide: {
        width: '100%',
        resizeMode: 'contain',
        marginBottom: normalizeV(12)
    },
    sections: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sectionContent: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6),
        textAlign: 'right',
        width: '50%'
    },
    action: {
        width: normalize(54),
        height: normalize(54)
    },
    line: {
        width: SCREEN_WIDTH * 0.17,
        borderBottomWidth: 1,
        top: -27,
        marginRight: -20,
        left: -10
    },
    status: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        fontSize: normalize(12),
        marginLeft: 5,
        lineHeight: normalizeV(21.6)
    }
})