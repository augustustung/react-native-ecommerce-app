import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { normalize, normalizeV, SCREEN_WIDTH } from '../ultis/Dimentions'
import PrimaryBlueButton from './PrimaryBlueButton'

const StatusAction = ({
    uri,
    title,
    subtitle,
    buttonTitle,
    onPress,
    center,
    buttonSubtitle,
    onPressSubtitle
}) => {
    return (
        <View style={[styles.container, { justifyContent: center ? 'center' : null }]}>
            <Image
                source={uri}
                style={styles.image}
            />
            <View style={styles.text}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <PrimaryBlueButton
                title={buttonTitle}
                onPress={onPress}
                marginBottom={buttonSubtitle ? normalizeV(16) : 0}
            />
            {
                buttonSubtitle &&
                <PrimaryBlueButton
                    title="Cancel"
                    onPress={onPressSubtitle}
                    titleColor="#9098B1"
                    borderColor="#EBF0FF"
                    backgroundColor="#fff"
                />
            }
        </View>
    )
}

export default StatusAction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        width: SCREEN_WIDTH * 0.392,
        height: SCREEN_WIDTH * 0.392,
        alignSelf: 'center'
    },
    text: {
        paddingBottom: normalizeV(16),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#223263',
        fontWeight: '700',
        fontSize: normalize(24),
        lineHeight: normalizeV(36),
        paddingBottom: normalizeV(8)
    },
    subtitle: {
        color: "#9098B1",
        fontWeight: '400',
        fontSize: normalize(12),
        lineHeight: normalizeV(21.6)
    }
})
