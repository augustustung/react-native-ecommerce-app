import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { normalizeV, normalize } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    selecCountry: {
        marginHorizontal: normalize(16),
        marginTop: normalizeV(12),
        marginBottom: normalizeV(24)
    },
    title: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        marginLeft: normalize(16),
        marginTop: normalizeV(16)
    }
})