import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { SCREEN_HEIGHT, normalize } from '../../../../../ultis/Dimentions'

export const styling = StyleSheet.create({
    containerCategory: {
        marginHorizontal: 16,
        marginBottom: 24
    },
    title: {
        fontWeight: '700',
        fontSize: normalize(14),
        marginBottom: SCREEN_HEIGHT * 0.0163,
        marginTop: SCREEN_HEIGHT * 0.0218,
        marginLeft: 16,
        lineHeight: normalize(21),
        color: ColorConst.NEUTRAL_DARK
    }
})