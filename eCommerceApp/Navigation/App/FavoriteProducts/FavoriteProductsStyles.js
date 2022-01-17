import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, normalize, normalizeV } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row',
        marginRight: normalize(16),
        width: SCREEN_WIDTH * 0.72,
        height: SCREEN_HEIGHT * 0.106,
        alignItems: 'center'
    },
    routeName: {
        fontWeight: '700',
        fontSize: normalize(16),
        lineHeight: normalize(24),
        overflow: 'hidden',
        letterSpacing: 0.5
    },
    card: {
        height: normalizeV(282),
        width: normalize(165),
        borderWidth: 1,
        borderColor: "#EBF0FF",
        borderRadius: 5,
        marginRight: normalize(13),
        marginBottom: normalizeV(12),
        flex: 1
    },
    cardImg: {
        height: normalize(133),
        width: normalize(133),
        resizeMode: 'cover',
        margin: normalize(10),
        borderRadius: 5,
        alignSelf: 'center'
    },
    cardTitle: {
        paddingTop: normalize(5),
        fontSize: normalize(12),
        textAlign: 'left',
        fontWeight: '700',
        marginHorizontal: normalize(10),
        overflow: 'hidden',
        marginHorizontal: normalize(40)
    },
    cardPrice: {
        color: "#40BFFF",
        margin: normalize(10),
        fontSize: normalize(12),
        fontWeight: '700',
        marginLeft: normalize(40)
    },
    oldPrice: {
        color: "#9098B1",
        fontWeight: '400',
        textDecorationLine: 'line-through',
        fontSize: normalize(10),
        marginLeft: normalize(40)
    },
    saleOff: {
        marginLeft: 5,
        fontWeight: '700',
        color: "#FB7181",
        fontSize: normalize(10)
    },
    updateTitle: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: normalize(14),
        color: '#40BFFF'
    },
    deleteBtn: {
        paddingLeft: normalize(20),
        top: -5
    },
    emptyTitle: {
        textAlign: 'center',
        fontSize: normalize(16),
        fontWeight: '700',
        color: '#40BFFF'
    },
    angleLeft: {
        paddingRight: SCREEN_WIDTH * 0.032,
        width: normalize(24),
        height: normalizeV(24)
    }
})