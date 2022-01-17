import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { SCREEN_HEIGHT, SCREEN_WIDTH, normalize, normalizeV } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    resultHeader: {
        flexDirection: 'row',
        marginHorizontal: normalize(16),
        marginTop: normalizeV(16),
        marginBottom: SCREEN_HEIGHT * 0.0245,
        justifyContent: 'space-between'
    },
    numRe: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(21.6),
        letterSpacing: 0.5
    },
    angleDown: {
        paddingLeft: normalize(8),
        paddingTop: -4,
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064
    },
    options: {
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    moreBtn: {
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064,
        resizeMode: 'contain',
        paddingLeft: normalize(8)
    }
})