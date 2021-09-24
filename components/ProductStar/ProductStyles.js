import { StyleSheet } from "react-native";
import { ColorConst } from "../../ultis/constant";
import { normalize, normalizeV, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../ultis/Dimentions";

export const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row'
    },
    card: {
        height: normalizeV(282),
        width: (SCREEN_WIDTH - normalize(32 + 8)) / 2,
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        backgroundColor: "#fff",
        borderRadius: 5,
        marginRight: normalize(16),
        marginBottom: normalizeV(12)
    },
    cardImg: {
        height: normalizeV(133),
        width: normalize(133),
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: SCREEN_HEIGHT * 0.02
    },
    cardTitle: {
        paddingTop: 8,
        fontSize: normalize(12),
        textAlign: 'left',
        fontWeight: '700',
        marginHorizontal: SCREEN_HEIGHT * 0.02179,
        overflow: 'hidden',
        marginLeft: SCREEN_HEIGHT * 0.02179,
        lineHeight: normalize(18)
    },
    cardPrice: {
        color: ColorConst.PRIMARY_BLUE,
        marginTop: SCREEN_HEIGHT * 0.02179,
        marginBottom: SCREEN_HEIGHT * 0.02179 / 4,
        fontSize: normalize(12),
        fontWeight: '700',
        marginLeft: SCREEN_HEIGHT * 0.02179
    },
    oldPrice: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        textDecorationLine: 'line-through',
        fontSize: normalize(10),
        marginLeft: SCREEN_HEIGHT * 0.02179
    },
    saleOff: {
        marginLeft: 5,
        fontWeight: '700',
        color: ColorConst.PRIMARY_RED,
        fontSize: normalize(10)
    },
    updateTitle: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        color: '#40BFFF'
    },
    rate: {
        flexDirection: 'row',
        marginLeft: SCREEN_HEIGHT * 0.02179,
        marginTop: 3
    },
    star: {
        width: SCREEN_WIDTH * 0.032,
        height: SCREEN_WIDTH * 0.032,
        marginRight: 2
    },
    deleteBtn: {
        position: 'absolute',
        right: SCREEN_HEIGHT * 0.02179,
        top: -9
    },
    image: {
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064
    }
})