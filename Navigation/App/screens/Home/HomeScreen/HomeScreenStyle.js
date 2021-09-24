import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { SCREEN_WIDTH, normalizeV, normalize } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: ColorConst.NEUTRAL_LIGHT,
        borderWidth: 1,
        paddingHorizontal: normalize(16)
    },
    searchContainer: {
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: normalizeV(16),
        flexDirection: "row",
        height: normalize(44),
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        marginLeft: normalize(8),
        overflow: 'hidden',
        fontSize: normalize(12),
        lineHeight: normalizeV(18),
        letterSpacing: 0.5
    },
    searchIcon: {
        width: SCREEN_WIDTH * 0.0426,
        height: SCREEN_WIDTH * 0.0426
    },
    headerRight: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    notification: {
        width: normalize(8),
        height: normalize(8),
        borderRadius: 50,
        backgroundColor: ColorConst.PRIMARY_RED,
        position: 'absolute',
        right: 0,
        top: -1
    },
    clearBtn: {
        position: 'absolute',
        right: SCREEN_WIDTH * 0.0426
    },
    image: {
        width: normalize(20),
        height: normalize(20)
    },
    tabBar: {
        width: normalize(24),
        height: normalize(24)
    }
})