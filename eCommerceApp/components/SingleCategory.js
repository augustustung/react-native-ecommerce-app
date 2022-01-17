import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from '../Navigation/App/screens/Home/Sections/sectionStyles'
import { normalize } from '../ultis/Dimentions'

const SingleCategory = ({ item, marginRight }) => {
    return (
        <TouchableOpacity style={[styles.categoryCard, { marginRight: marginRight ? marginRight : normalize(12) }]}>
            <View style={styles.categoryImageWrapper}>
                <Image
                    source={item.image}
                    style={styles.categoryImage}
                />
            </View>
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    )
}

export default SingleCategory
