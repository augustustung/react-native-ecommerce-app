import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { SCREEN_WIDTH, normalizeV, normalize } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    error: {
        flexDirection: 'row',
        marginLeft: normalize(16),
        marginVertical: normalizeV(27),
        alignItems: 'center'
    },
    alert: {
        width: normalize(24),
        height: normalize(24),
        marginRight: normalize(8)
    },
    errTitle: {
        color: ColorConst.PRIMARY_RED,
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalizeV(18)
    },
    singleInput: {
        marginTop: normalizeV(24)
    },
    wrapper: {
        flexDirection: 'row'
    },
    inputWrapper: {
        width: (SCREEN_WIDTH - 32 - 13 / 2) / 2,
        marginTop: normalizeV(24)
    }
})