import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    item: {
        height: SCREEN_HEIGHT * 0.08,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: SCREEN_WIDTH * 0.064,
        height: SCREEN_WIDTH * 0.064,
        marginRight: 16
    },
    itemName: {
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(18),
        color: ColorConst.NEUTRAL_DARK
    }
})