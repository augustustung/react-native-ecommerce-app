import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize, normalizeV } from '../../../../../ultis/Dimentions'
import { ColorConst } from '../../../../../ultis/constant'

export const styles = StyleSheet.create({
    headerWrapper: {
        marginVertical: normalize(16),
        marginRight: normalize(16),
        width: SCREEN_WIDTH * 0.72,
        height: SCREEN_HEIGHT / 13,
        justifyContent: 'center'
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: normalize(16),
        lineHeight: normalize(24)
    },
    headerRight: {
        width: normalize(24),
        height: normalize(24)
    },
    btnHeader: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: SCREEN_WIDTH * 0.16
    },
    containerItems: {
        marginHorizontal: normalize(16),
        marginBottom: normalize(32),
        marginTop: normalize(16),
        zIndex: 1,
        height: normalize(224),
        flexGrow: 0
    },
    items: {
        borderRadius: 5,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        height: normalize(104),
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: normalize(16)
    },
    image: {
        marginLeft: normalize(16),
        marginRight: normalize(12),
        width: normalize(72),
        height: normalize(72),
        borderRadius: 5,
        borderWidth: 1
    },
    contentRight: {
        width: normalize(375 - 32 - 16 - 72 - 16),
        height: normalize(72),
        justifyContent: 'space-between'
    },
    name: {
        lineHeight: normalize(18),
        width: '70%',
        fontWeight: '700',
        height: normalize(36),
        fontSize: normalize(12),
        overflow: 'hidden',
        letterSpacing: 0.5
    },
    header: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    iconBtn: {
        width: normalize(24),
        height: normalize(24),
        marginLeft: 8
    },
    footer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 9 / 367
    },
    price: {
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(18),
        color: ColorConst.PRIMARY_BLUE
    },
    btnAdjust: {
        flexDirection: 'row',
        width: SCREEN_WIDTH * 0.277,
        height: SCREEN_HEIGHT * 0.032,
        justifyContent: 'flex-end',
        top: - SCREEN_HEIGHT * 3 / 367
    },
    containBtn: {
        width: normalize(32),
        height: normalize(24),
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: ColorConst.NEUTRAL_LIGHT
    },
    btn: {
        width: normalize(16),
        height: normalize(16)
    },
    containQuantity: {
        backgroundColor: '#EBF0FF',
        width: normalize(40),
        height: normalize(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity: {
        color: '#223263',
        fontSize: normalize(12),
        fontWeight: '400',
        lineHeight: normalize(18),
        letterSpacing: 0.5
    },
    code: {
        flexDirection: 'row',
        zIndex: 2,
        marginHorizontal: SCREEN_HEIGHT * 8 / 375,
        width: '100%',
    },
    enterCode: {
        height: SCREEN_HEIGHT * 0.076,
        borderWidth: 1,
        width: SCREEN_WIDTH * 256 / 375,
        borderTopLeftRadius: 5,
        borderRightWidth: 0,
        borderBottomLeftRadius: 5,
        paddingLeft: SCREEN_WIDTH * 16 / 375,
        fontSize: normalize(12),
        lineHeight: normalize(21.6),
        letterSpacing: 0.5,
        color: ColorConst.NEUTRAL_GREY
    },
    apply: {
        backgroundColor: ColorConst.PRIMARY_BLUE,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH * 87 / 375
    },
    applyTitle: {
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(21.6),
        color: "#fff"
    },
    bill: {
        borderRadius: 5,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        marginHorizontal: SCREEN_WIDTH * 16 / 375,
        borderWidth: 1,
        zIndex: 2,
        padding: normalize(16),
        marginBottom: normalize(16)
    },
    message: {
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(21.6),
        paddingLeft: normalize(16),
        marginBottom: normalize(16)
    },
    section: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sectionTitle: {
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalize(21.6),
        color: ColorConst.NEUTRAL_GREY
    },
    sectionContent: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalize(21.6)
    },
    divide: {
        width: SCREEN_WIDTH - 64,
        alignSelf: 'center',
        resizeMode: 'contain',
        paddingVertical: normalize(12),
    },
    err: {
        fontWeight: '700',
        fontSize: normalize(12),
        marginLeft: normalize(16),
        lineHeight: normalize(21.6),
        color: ColorConst.PRIMARY_RED,
        marginBottom: normalize(16)
    },
    wrapper: {
        marginHorizontal: normalize(16),
        marginTop: normalizeV(16)
    }
})