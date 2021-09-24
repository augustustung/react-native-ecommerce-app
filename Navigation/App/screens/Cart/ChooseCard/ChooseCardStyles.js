import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize, normalizeV } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    headerRight: {
        width: normalize(24),
        height: normalize(24),
        resizeMode: 'contain'
    },
    top: {
        flex: 1
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: SCREEN_WIDTH * 0.16
    },
    swiper: {
        height: SCREEN_HEIGHT * 0.32,
        marginHorizontal: normalize(16),
        marginTop: normalizeV(16)
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
    customStyleSwiperDot: {
        position: "absolute",
        top: normalizeV(16 + 190),
        bottom: undefined,
    }
})