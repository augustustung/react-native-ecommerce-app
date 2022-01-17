import { StyleSheet } from "react-native";
import { ColorConst } from "../../../ultis/constant";
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    btnViewAll: {
        width: SCREEN_WIDTH * 0.26,
        height: SCREEN_HEIGHT * 0.068,
        backgroundColor: ColorConst.PRIMARY_BLUE_OPACITY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderRadius: 5
    },
    btnTitle: {
        color: ColorConst.PRIMARY_BLUE,
        fontSize: normalize(12),
        fontWeight: '700',
        lineHeight: normalize(18),
        letterSpacing: 0.5
    },
    btnStar: {
        width: SCREEN_WIDTH * 0.165,
        height: SCREEN_HEIGHT * 0.068,
        borderRadius: 5,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1
    },
    starIcon: {
        width: SCREEN_WIDTH * 0.0426,
        height: SCREEN_WIDTH * 0.0426
    },
    btnStarTitle: {
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalize(18),
        marginLeft: 10,
        letterSpacing: 0.5,
        color: ColorConst.NEUTRAL_GREY
    },
    emptyTitle: {
        textAlign: 'center',
        fontSize: normalize(16),
        fontWeight: '700',
        color: ColorConst.PRIMARY_BLUE,
        marginVertical: SCREEN_HEIGHT * 0.1
    }
})