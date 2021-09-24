import { StyleSheet } from "react-native";
import { ColorConst } from "../../../../../ultis/constant";
import { normalize, normalizeV, SCREEN_HEIGHT } from '../../../../../ultis/Dimentions'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: normalize(16)
    },
    card: {
        height: normalizeV(282),
        width: normalize(165),
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        borderRadius: 5,
        marginRight: normalize(13),
        marginBottom: normalizeV(12),
        flex: 1
    },
    cardImg: {
        height: normalize(109),
        width: normalize(109),
        resizeMode: 'cover',
        margin: 10,
        borderRadius: 5,
        alignSelf: 'center'
    },
    cardTitle: {
        paddingTop: 5,
        fontSize: 12,
        textAlign: 'left',
        fontWeight: '700',
        marginHorizontal: 10,
        overflow: 'hidden',
        marginHorizontal: 30
    },
    cardPrice: {
        color: "#40BFFF",
        margin: 10,
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 30
    },
    oldPrice: {
        color: "#9098B1",
        fontWeight: '400',
        textDecorationLine: 'line-through',
        fontSize: 10,
        marginLeft: 30
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