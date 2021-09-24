import { StyleSheet } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH, normalize } from '../../ultis/Dimentions'
import { ColorConst } from '../../ultis/constant'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: normalize(16),
    },
    logo: {
        height: SCREEN_WIDTH * 0.192,
        width: SCREEN_WIDTH * 0.192,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    title: {
        fontSize: normalize(16),
        fontWeight: '700',
        paddingTop: SCREEN_HEIGHT * 0.022,
        paddingBottom: SCREEN_HEIGHT * 0.011,
        color: ColorConst.NEUTRAL_DARK
    },
    subTitle: {
        fontSize: normalize(12),
        fontWeight: '400',
        color: ColorConst.NEUTRAL_GREY,
        paddingBottom: SCREEN_HEIGHT * 0.038
    },
    btn: {
        width: SCREEN_WIDTH,
        marginTop: SCREEN_HEIGHT * 0.01
    },
    forgotButton: {
        marginTop: SCREEN_HEIGHT * 0.022,
        marginBottom: SCREEN_HEIGHT * 0.011
    },
    forgotButtonText: {
        fontWeight: '700',
        fontSize: normalize(12),
        color: ColorConst.PRIMARY_BLUE
    },
    btnRegister: {
        fontWeight: '700',
        fontSize: normalize(12),
        color: ColorConst.PRIMARY_BLUE
    },
    navButtonText: {
        fontSize: normalize(12),
        fontWeight: '700',
        color: ColorConst.NEUTRAL_GREY
    },
    err: {
        color: ColorConst.PRIMARY_RED,
        fontSize: normalize(12),
        fontWeight: '700',
        alignSelf: 'flex-start',
        marginBottom: SCREEN_HEIGHT * 0.022
    },
    options: {
        flexDirection: 'row',
        marginTop: SCREEN_HEIGHT * 0.028,
        marginBottom: SCREEN_HEIGHT * 0.022,
        marginHorizontal: normalize(16)
    },
    lineLeft: {
        width: SCREEN_WIDTH * 0.3752,
        borderBottomColor: ColorConst.NEUTRAL_LIGHT,
        borderBottomWidth: 1,
        marginRight: SCREEN_WIDTH * 0.0613,
        top: -8,
    },
    lineRight: {
        width: SCREEN_WIDTH * 0.3752,
        borderBottomColor: ColorConst.NEUTRAL_LIGHT,
        borderBottomWidth: 1,
        top: -8,
        marginLeft: SCREEN_WIDTH * 0.0613
    },
    otherTitle: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        // top: 0,
        fontSize: normalize(14),
        lineHeight: normalize(21)
    }
})