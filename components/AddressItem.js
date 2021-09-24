import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styles } from '../Navigation/App/screens/Cart/Ship/ShipStyles'

const AddressItem = ({ item, borderColor, handleEdit, handleDelete, handleChoose }) => {
    return (
        <TouchableOpacity
            style={[styles.cardContainer, { borderColor: borderColor }]}
            onPress={() => handleChoose(item)}
        >
            <View style={styles.addressWrapper}>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.info}>{item.detail} {item.country}</Text>
                <Text style={styles.info}>{item.phoneNumber}</Text>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.edit}
                        onPress={() => handleEdit(item)}
                    >
                        <Text style={styles.btnTitle}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.delete}
                        onPress={() => handleDelete(item)}
                    >
                        <Image
                            style={styles.btnTrash}
                            source={require('../image/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AddressItem
