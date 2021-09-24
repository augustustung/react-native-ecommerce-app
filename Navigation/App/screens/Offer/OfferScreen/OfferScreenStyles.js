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
        lineHeight: normalizeV(24),
        letterSpacing: 0.5
    },
    outstanding: {
        backgroundColor: "#40BFFF",
        marginHorizontal: normalize(16),
        paddingLeft: normalize(16),
        paddingVertical: normalizeV(16),
        borderRadius: 5,
        marginTop: normalizeV(16),
        justifyContent: 'center'
    },
    outstandingTitle: {
        color: "#fff",
        fontWeight: '700',
        fontSize: normalize(16),
        lineHeight: normalizeV(24),
        width: normalize(212)
    }
})