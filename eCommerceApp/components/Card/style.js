import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize, normalizeV } from '../../ultis/Dimentions'

export const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        paddingVertical: normalizeV(24),
        paddingHorizontal: normalize(21)
    },
    symbol: {
        flexDirection: 'row',
        marginBottom: SCREEN_HEIGHT * 0.042
    },
    symbolImage: {
        width: SCREEN_WIDTH * 0.06,
        height: SCREEN_WIDTH * 0.06,
        resizeMode: "contain",
        opacity: 0.7
    },
    cardNumberContainer: {
        flexDirection: 'row',
        marginBottom: normalizeV(19)
    },
    cardNumber: {
        fontWeight: '700',
        fontSize: normalize(24),
        lineHeight: normalizeV(36),
        color: "#fff"
    },
    text: {
        color: "#fff",
        fontWeight: '400',
        fontSize: normalize(10),
        lineHeight: normalizeV(15),
        marginBottom: 4
    }
})