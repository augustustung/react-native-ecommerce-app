import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { normalize, normalizeV, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    title: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalize(21),
        margin: normalize(16)
    },
    chooseStar: {
        flexDirection: 'row',
        marginHorizontal: normalize(16),
        marginBottom: SCREEN_HEIGHT * 0.0327
    },
    selectedStar: {
        fontWeight: '700',
        fontSize: normalize(14),
        color: '#9098B1',
        alignSelf: 'center',
        lineHeight: normalizeV(21)
    },
    content: {
        paddingHorizontal: normalize(16),
        paddingTop: normalizeV(16),
        fontSize: normalize(12),
        color: ColorConst.NEUTRAL_GREY,
        borderWidth: 1,
        marginHorizontal: normalize(16),
        paddingBottom: SCREEN_HEIGHT * 0.1662,
        marginBottom: SCREEN_HEIGHT * 0.0327
    },
    chooseImage: {
        marginHorizontal: normalize(16),
        flexDirection: 'row',
        marginBottom: normalizeV(30)
    },
    square: {
        borderRadius: 5,
        borderColor: '#EBF0FF',
        borderWidth: 1,
        marginRight: normalizeV(12),
        width: normalize(72),
        height: normalize(72),
        justifyContent: 'center',
        alignItems: 'center'
    },
    starIcon: {
        marginRight: 16,
        width: SCREEN_WIDTH * 0.085,
        height: SCREEN_WIDTH * 0.085
    },
    plus: {
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064
    }
})