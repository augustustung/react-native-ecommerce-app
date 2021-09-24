import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    sectionContainer: {
        marginHorizontal: 16,
        marginTop: SCREEN_HEIGHT * 0.033,
    },
    sectionTitle: {
        fontWeight: '700',
        color: ColorConst.NEUTRAL_DARK,
        fontSize: normalize(14),
        lineHeight: normalize(21),
        letterSpacing: 0.5,
        marginBottom: 12
    },
    item: {
        borderRadius: 5,
        marginRight: 9,
        marginBottom: 8,
        borderWidth: 1
    },
    itemTitle: {
        fontSize: normalize(12),
        lineHeight: normalize(18),
        padding: SCREEN_WIDTH * 0.0426
    }
})