import { StyleSheet } from 'react-native';
import { ColorConst } from '../../ultis/constant';
import { SCREEN_WIDTH, SCREEN_HEIGHT, normalize } from '../../ultis/Dimentions'

export default StyleSheet.create({
    root: {
        alignItems: 'stretch',
        flex: 1,
        backgroundColor: '#fff',
    },
    slider: {
        backgroundColor: '#fff',
        paddingTop: normalize(12)
    },
    horizontalContainer: {
        flexDirection: 'row'
    },
    leading: {
        paddingLeft: normalize(16),
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: normalize(12)
    },
    containerValue: {
        borderWidth: 1,
        borderRadius: 5,
        width: SCREEN_WIDTH * 0.44,
        height: SCREEN_HEIGHT * 0.065,
        alignItems: 'center',
        flexDirection: 'row'
    },
    valueText: {
        color: ColorConst.NEUTRAL_GREY,
        overflow: 'hidden',
        fontWeight: '700',
        fontSize: normalize(12),
        left: -2,
        width: '80%',
        height: '100%'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    footerText: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(18)
    }
});