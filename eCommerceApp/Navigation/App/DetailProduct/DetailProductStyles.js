import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { normalize, normalizeV, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    moreIcon: {
        marginLeft: normalize(16),
        width: normalize(24),
        height: normalizeV(24)
    },
    wrapper: {
        height: SCREEN_HEIGHT * 0.35,
        marginBottom: normalizeV(40)
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    productImg: {
        resizeMode: 'cover',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.35
    },
    customStyleSwiperDot: {
        position: "absolute",
        top: SCREEN_HEIGHT * 0.35 + 16,
        bottom: undefined
    },
    productNameWrapper: {
        marginHorizontal: normalize(16),
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.096,
        justifyContent: 'space-between',
        marginBottom: normalizeV(8)
    },
    productName: {
        fontWeight: '700',
        fontSize: normalize(20),
        width: "73%",
        lineHeight: normalize(30),
        letterSpacing: 0.5,
        color: ColorConst.NEUTRAL_DARK
    },
    favoriteBtn: {
        width: normalize(24),
        height: normalizeV(24),
        paddingTop: 5
    },
    rate: {
        flexDirection: 'row',
        marginBottom: normalizeV(16),
        marginHorizontal: normalize(16)
    },
    starIcon: {
        width: normalize(16),
        height: normalizeV(16),
        marginRight: 4
    },
    productPrice: {
        fontSize: normalize(20),
        color: ColorConst.PRIMARY_BLUE,
        marginBottom: normalizeV(24),
        fontWeight: '700',
        marginHorizontal: normalize(16)
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: normalize(14),
        marginBottom: normalize(12),
        marginHorizontal: normalize(16),
        color: ColorConst.NEUTRAL_DARK,
        lineHeight: normalize(21),
        letterSpacing: 0.5
    },
    selectSize: {
        width: normalize(48),
        height: normalize(48),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginRight: normalize(16)
    },
    label: {
        fontSize: normalize(14),
        fontWeight: '700',
        lineHeight: normalize(21),
        letterSpacing: 0.5,
        color: ColorConst.NEUTRAL_DARK
    },
    emptyColor: {
        fontSize: normalize(14),
        textAlign: 'center',
        color: ColorConst.PRIMARY_BLUE,
        fontWeight: '700',
        marginBottom: normalizeV(12),
    },
    selectedColor: {
        backgroundColor: "#fff",
        width: SCREEN_WIDTH * 0.13 / 3,
        height: SCREEN_WIDTH * 0.13 / 3,
        borderRadius: 50
    },
    shown: {
        marginHorizontal: normalize(16),
        marginBottom: normalizeV(16),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    style: {
        marginHorizontal: normalize(16),
        marginBottom: normalizeV(24),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    specificationTitle: {
        fontSize: normalize(12),
        fontWeight: '400',
        color: ColorConst.NEUTRAL_DARK,
        lineHeight: normalize(21.6),
        letterSpacing: 0.5
    },
    specificationContent: {
        fontSize: normalize(12),
        fontWeight: '400',
        color: ColorConst.NEUTRAL_GREY,
        lineHeight: normalize(21.6),
        letterSpacing: 0.5
    },
    description: {
        color: ColorConst.NEUTRAL_GREY,
        fontSize: normalize(12),
        fontWeight: '400',
        lineHeight: normalize(21.6),
        letterSpacing: 0.5
    },
    rateAverage: {
        fontSize: normalize(10),
        fontWeight: '700',
        color: ColorConst.NEUTRAL_GREY,
        marginLeft: 4,
        top: -2,
        lineHeight: normalize(15)
    },
    rateReview: {
        fontWeight: '400',
        fontSize: normalize(10),
        color: ColorConst.NEUTRAL_GREY,
        lineHeight: normalize(15)
    },
    reviewer: {
        marginRight: normalize(16)
    },
    info: {
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.065,
        marginBottom: normalizeV(16)
    },
    avatar: {
        width: SCREEN_WIDTH * 0.128,
        height: SCREEN_WIDTH * 0.128,
        borderRadius: 50,
        marginRight: normalize(16)
    },
    listImage: {
        marginBottom: normalize(16),
        flexDirection: 'row'
    },
    image: {
        marginRight: normalize(12),
        marginTop: normalize(16),
        borderRadius: 5,
        width: SCREEN_WIDTH * 0.19,
        height: SCREEN_WIDTH * 0.19
    },
    timeComment: {
        fontSize: normalize(10),
        lineHeight: normalizeV(15),
        fontWeight: '400',
        color: ColorConst.NEUTRAL_GREY,
        marginBottom: normalizeV(23)
    }
})