import { Image, Text, TouchableOpacity } from 'react-native'
import { styles } from '../Navigation/App/FavoriteProducts/FavoriteProductsStyles'
import React from 'react'
import { SCREEN_WIDTH } from './Dimentions'

export const calculateStar = (listReview) => {
    //calculate average star
    let star = 0
    for (let i = 0; i < listReview.length; i++) {
        star += listReview[i].star
    }
    star = star / listReview.length.toFixed(1)

    // make an array 1 is yes 0 is no
    let arr = []
    for (let i = 1; i < 6; i++) {
        if (star - i < 0)
            arr.push(0)
        else
            arr.push(1)
    }

    return {
        arrStar: arr,
        average: star
    }
}

export const calculateStarOnePerson = (star) => {
    // make an array 1 is yes 0 is no
    let arr = []
    for (let i = 1; i < 6; i++) {
        if (star - i < 0)
            arr.push(0)
        else
            arr.push(1)
    }

    return arr
}

export const headerLeft = ({ navigation, routeName, width }) => {
    return (
        <TouchableOpacity
            style={styles.headerLeft}
            onPress={navigation.goBack}
        >
            <Image
                source={require('../image/left.png')}
                style={styles.angleLeft}
            />
            <Text style={[styles.routeName, { width: width && SCREEN_WIDTH * width }]} numberOfLines={1}>{routeName}</Text>
        </TouchableOpacity>)
}

export const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const emptyTitle = (marginTop, title = "System is updating!") => (
    <Text style={[styles.emptyTitle, { marginTop: marginTop ? marginTop : 0 }]}>{title}</Text>
)