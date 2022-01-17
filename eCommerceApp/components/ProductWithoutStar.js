import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { styles } from '../Navigation/App/screens/Home/Sections/sectionStyles'
import { SCREEN_HEIGHT } from '../ultis/Dimentions'

class ProductWithoutStar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStar: []
        }
    }

    componentDidMount() {
        const { item } = this.props
        if (item.reviewProduct) {
            let s = 0
            for (let i = 0; i < item.reviewProduct.length; i++) {
                s += item.reviewProduct[i].star
            }
            s = s / item.reviewProduct.length.toFixed(0)
            this.buildArrayStar(s)
        }
    }

    buildArrayStar = (star) => {
        let arr = []
        for (let i = 1; i < 6; i++) {
            if (star - i < 0)
                arr.push(0)
            else
                arr.push(1)
        }

        this.setState({ arrStar: arr })
    }

    render() {
        const { item, navigation } = this.props
        return (
            <TouchableOpacity style={styles.sectionCard} onPress={() => navigation.navigate("Detail Product", item._id)}>
                <Image
                    source={{ uri: item.image[0] }}
                    style={styles.cardImg}
                />
                <View style={{ height: SCREEN_HEIGHT * 0.052 }}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{item.name}</Text>
                </View>
                {
                    !item.saleOff ? (
                        <Text style={styles.cardPrice}>${item.price}</Text>
                    ) : (
                        <>
                            <Text style={styles.cardPrice}>${item.saleOff}</Text>
                            <View style={styles.saleOffWrapper}>
                                <Text style={styles.oldPrice}>${item.price}</Text>
                                <Text style={styles.saleOff}>{(100 - (item.saleOff / item.price) * 100).toFixed(0)}% Off</Text>
                            </View>
                        </>
                    )
                }
            </TouchableOpacity>
        )
    }
}

export default ProductWithoutStar