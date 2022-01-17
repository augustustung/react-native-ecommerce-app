import { StyleSheet } from "react-native";
import { normalize, normalizeV, SCREEN_WIDTH } from '../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    iconRight: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        width: SCREEN_WIDTH * 0.2 - 20
    },
    icon: {
        width: normalize(24),
        height: normalize(24)
    },
    routeName: {
        fontWeight: '700',
        fontSize: 18
    },
    wrapper: {
        marginLeft: normalize(16),
        marginTop: normalizeV(16)
    },
    card: {
        height: 282,
        width: 165,
        borderWidth: 1,
        borderColor: "#EBF0FF",
        backgroundColor: "#fff",
        borderRadius: 5,
        marginRight: 13,
        marginBottom: 12,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImg: {
        height: 109,
        width: 109,
        resizeMode: 'cover',
        margin: 10,
        borderRadius: 5
    },
    cardTitle: {
        paddingTop: 5,
        fontSize: 12,
        textAlign: 'left',
        fontWeight: '700',
        marginHorizontal: 10,
        lineHeight: 18,
        overflow: 'hidden'
    },
    cardPrice: {
        color: "#40BFFF",
        margin: 10,
        fontSize: 12,
        fontWeight: '700'
    },
    oldPrice: {
        color: "#9098B1",
        fontWeight: '400',
        textDecorationLine: 'line-through',
        fontSize: 10
    },
    saleOff: {
        marginLeft: 5,
        fontWeight: '700',
        color: "#FB7181",
        fontSize: 10
    },
    updateTitle: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        color: '#40BFFF'
    }
})