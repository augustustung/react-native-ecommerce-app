import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { styles } from './ProductStyles'
import { calculateStar } from '../../ultis/CommonUlti'

class ProductStar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStar: []
        }
    }

    componentDidMount() {
        const { item } = this.props
        if (item.reviewProduct) {
            let arr = calculateStar(item.reviewProduct)
            this.setState({ arrStar: arr.arrStar })
        }
    }

    render() {
        const { item, navigation, uri } = this.props
        const { arrStar } = this.state
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.push("Detail Product", item._id)}
            >
                <Image
                    source={{ uri: item.image[0] }}
                    style={styles.cardImg}
                />
                <View style={{ height: '18%' }}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                </View>
                <View style={styles.rate}>
                    {
                        arrStar.map((item, index) => (
                            <Image
                                style={styles.star}
                                key={index}
                                source={+item === 1 ? require("../../image/star.png") : require("../../image/unstar.png")}
                            />
                        ))
                    }
                </View>

                {
                    !item.saleOff ? (
                        <Text style={styles.cardPrice}>${item.price}</Text>
                    ) : (
                        <>
                            <Text style={styles.cardPrice}>${item.saleOff}</Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.oldPrice}>${item.price}</Text>
                                <Text style={styles.saleOff}>{(100 - (item.saleOff / item.price) * 100).toFixed(0)}% Off</Text>
                                {
                                    uri &&
                                    <TouchableOpacity style={styles.deleteBtn} onPress={() => this.props.handleDeleteFromWishlist(item)}>
                                        <Image style={styles.image} source={uri} />
                                    </TouchableOpacity>
                                }
                            </View>

                        </>
                    )
                }
            </TouchableOpacity >
        )
    }
}

export default ProductStar