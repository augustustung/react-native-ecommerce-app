import React, { useState } from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Image
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, normalize } from '../ultis/Dimentions'
import { ColorConst } from '../ultis/constant'

export default FormInput = ({
    title,
    value,
    setValue,
    uri,
    placeholder,
    onFocus,
    disable,
    onBlur,
    borderColor,
    marginBottom,
    left,
    flexWidth,
    ...rest
}) => {
    const [color, setColor] = useState(ColorConst.NEUTRAL_LIGHT)

    return (
        <View style={{
            marginLeft: left ? 0 : normalize(16),
            marginBottom: marginBottom,
            width: flexWidth ? '100%' : SCREEN_WIDTH - normalize(32)
        }}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={[styles.fromGroup, { borderColor: borderColor ? borderColor : color }]}>
                {uri && <Image
                    source={uri}
                    style={styles.leading}
                />}
                <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    editable={disable ? false : true}
                    selectTextOnFocus={disable ? false : true}
                    onFocus={() => {
                        setColor(ColorConst.PRIMARY_BLUE)
                        onFocus && onFocus()
                    }}
                    onBlur={() => {
                        setColor(ColorConst.NEUTRAL_LIGHT)
                        onBlur && onBlur()
                    }}
                    value={value}
                    placeholderTextColor={ColorConst.NEUTRAL_GREY}
                    placeholder={placeholder ? placeholder : ''}
                    onChangeText={(text) => setValue(text)}
                    autoCorrect={false}
                    {...rest}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fromGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        height: SCREEN_HEIGHT * 0.065
    },
    leading: {
        width: normalize(24),
        height: normalize(24),
        marginLeft: normalize(16)
    },
    title: {
        marginBottom: normalize(12),
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalize(21)
    },
    input: {
        height: '100%',
        marginLeft: normalize(10),
        width: normalize(277),
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '700',
        fontSize: normalize(12),
        lineHeight: normalize(21.7),
        textAlignVertical: 'center'
    }
})