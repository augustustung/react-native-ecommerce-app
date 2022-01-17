import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../Navigation/App/screens/Cart/CartScreen/CartScreenStyles'

const CartItem = ({
    item,
    handleChangeWishlist,
    removeFromCart,
    navigate,
    changeQuantity,
    showDelete,
    showAdjustQuantity
}) => {

    return (
        <TouchableOpacity onPress={navigate} style={styles.items}>
            <Image
                source={{ uri: item.productImage ? item.productImage : item.image[0] }}
                style={styles.image}
            />
            <View style={styles.contentRight}>
                <View style={styles.header}>
                    <Text numberOfLines={2} style={styles.name}>{item.productName ? item.productName : item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => handleChangeWishlist(item)}
                        >
                            <Image
                                source={item.isFavorite
                                    ? require('../image/wishlistAdded.png')
                                    : require('../image/wishlist.png')
                                }
                                style={styles.iconBtn}
                            />
                        </TouchableOpacity>
                        {showDelete && <TouchableOpacity onPress={() => removeFromCart(item)}>
                            <Image
                                style={styles.iconBtn}
                                source={require('../image/trash.png')}
                            />
                        </TouchableOpacity>}
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>${item.saleOff ? item.saleOff : item.price}</Text>

                    {showAdjustQuantity && <View style={styles.btnAdjust}>
                        <TouchableOpacity
                            style={[styles.containBtn, {
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0
                            }]}
                            onPress={() => changeQuantity(item, "DECREASING")}
                        >
                            <Image
                                source={require('../image/minus.png')}
                                style={styles.btn}
                            />
                        </TouchableOpacity>
                        <View style={styles.containQuantity}>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.containBtn, {
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0
                            }]}
                            onPress={() => changeQuantity(item, "INCREASING")}
                        >
                            <Image
                                style={styles.btn}
                                source={require('../image/plus.png')}
                            />
                        </TouchableOpacity>
                    </View>}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CartItem
