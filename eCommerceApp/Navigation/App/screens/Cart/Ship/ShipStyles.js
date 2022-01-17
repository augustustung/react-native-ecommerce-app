import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { normalizeV, normalize } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 5,
        borderWidth: 1,
        height: normalizeV(240),
        marginBottom: normalizeV(16)
    },
    city: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        paddingBottom: normalizeV(16)
    },
    info: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6),
        paddingBottom: normalizeV(16)
    },
    button: {
        flexDirection: 'row',
        height: normalize(57)
    },
    edit: {
        width: normalize(77),
        height: '100%',
        backgroundColor: ColorConst.PRIMARY_BLUE,
        marginRight: normalize(24),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    delete: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnTitle: {
        color: "#fff",
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(25.2)
    },
    btnTrash: {
        width: normalize(24),
        height: normalize(24)
    },
    addressWrapper: {
        padding: normalize(24)
    }
})