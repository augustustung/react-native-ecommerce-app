import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { SCREEN_WIDTH } from '../../ultis/Dimentions'
import { styles } from './style'

const Card = ({ item, i, marginRight }) => {
    const arrNumber = item.cardNumber.trim().split("-")

    const getBgColor = () => {
        switch (i) {
            case 0:
                return "#40BFFF"
            case 1:
                return "#5C61F4"
            default:
                return "#40BFFF"
        }
    }

    return (
        <View style={[styles.container, {
            backgroundColor: getBgColor()
        }]}>
            <View style={styles.symbol}>
                <Image
                    source={require('../../image/cardElip.png')}
                    style={styles.symbolImage}
                />
                <Image
                    source={require('../../image/cardElip.png')}
                    style={[styles.symbolImage, { marginLeft: -10 }]}
                />
            </View>
            <View style={styles.cardNumberContainer}>
                {
                    arrNumber.map((num, index) => (
                        <Text
                            key={index}
                            style={[styles.cardNumber, {
                                marginRight: !marginRight ? (index !== 3 ? SCREEN_WIDTH * 0.072 : 0) : marginRight
                            }]}
                        >{num}</Text>

                    ))
                }
            </View>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: SCREEN_WIDTH * 0.072 }}>
                    <Text style={styles.text}>CARD HOLDER</Text>
                    <Text style={[styles.text, { fontWeight: '700' }]}>{item.cardHolder}</Text>
                </View>
                <View style={{ marginRight: SCREEN_WIDTH * 0.072 }}>
                    <Text style={styles.text}>CARD SAVE</Text>
                    <Text style={[styles.text, { fontWeight: '700' }]}>{item.cardSave}</Text>
                </View>
            </View>
        </View>
    )
}

export default Card
