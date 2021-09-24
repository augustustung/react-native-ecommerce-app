import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalizeV, normalize } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    headerWrapper: {
        marginVertical: normalizeV(16),
        marginRight: normalize(16),
        width: SCREEN_WIDTH * 0.72,
        height: SCREEN_HEIGHT / 13,
        justifyContent: 'center'
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: normalize(16),
        lineHeight: normalizeV(24)
    },
    item: {
        height: SCREEN_HEIGHT * 0.08,
        paddingHorizontal: normalize(16),
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: normalize(24),
        height: normalize(24),
        resizeMode: 'contain',
        marginRight: normalize(16)
    },
    itemName: {
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(18),
        color: "#223263"
    }
})