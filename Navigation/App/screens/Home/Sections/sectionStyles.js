import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, normalize, normalizeV } from '../../../../../ultis/Dimentions'
import { ColorConst } from '../../../../../ultis/constant'

export const styles = StyleSheet.create({
    sectionContainer: {
        marginHorizontal: 16,
        marginTop: SCREEN_HEIGHT * 0.065
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sectionTitle: {
        fontSize: normalize(14),
        fontWeight: '700',
        color: ColorConst.NEUTRAL_DARK,
        lineHeight: normalizeV(21),
        letterSpacing: 0.5
    },
    sectionFooter: {
        marginTop: normalize(12)
    },
    btnTitle: {
        color: ColorConst.PRIMARY_BLUE,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        letterSpacing: 0.5
    },
    sectionCard: {
        height: normalizeV(238),
        width: normalize(141),
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginRight: normalize(16)
    },
    cardImg: {
        height: normalizeV(109),
        width: normalize(109),
        alignSelf: 'center',
        marginTop: normalizeV(16),
        marginBottom: normalizeV(8),
        borderRadius: 5
    },
    cardTitle: {
        fontSize: normalize(12),
        textAlign: 'left',
        fontWeight: '700',
        marginHorizontal: normalizeV(16),
        lineHeight: normalizeV(18),
        overflow: 'hidden'
    },
    cardPrice: {
        color: ColorConst.PRIMARY_BLUE,
        marginLeft: normalize(16),
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6),
        fontWeight: '700',
        paddingTop: normalizeV(8)
    },
    saleOffWrapper: {
        flexDirection: 'row',
        marginHorizontal: normalize(16),
        marginTop: 8
    },
    oldPrice: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        textDecorationLine: 'line-through',
        fontSize: normalize(10),
        lineHeight: normalizeV(15),
        letterSpacing: 0.5
    },
    saleOff: {
        marginLeft: 5,
        fontWeight: '700',
        color: ColorConst.PRIMARY_RED,
        fontSize: normalize(10),
        lineHeight: normalizeV(15),
        letterSpacing: 0.5
    },
    categoryCard: {
        height: normalize(108),
        width: normalize(70),
        marginTop: normalize(12)
    },
    categoryImageWrapper: {
        width: normalize(70),
        height: normalize(70),
        alignSelf: 'center',
        borderRadius: 70,
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        marginBottom: normalize(8),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    categoryImage: {
        alignSelf: 'center',
        width: normalize(24),
        height: normalize(24)
    },
    categoryTitle: {
        fontSize: normalize(10),
        color: ColorConst.NEUTRAL_GREY,
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: normalize(15),
        letterSpacing: 0.5
    }
})