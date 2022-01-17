import React, { Component } from 'react'
import {
    View,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import ProductStar from '../../../../../components/ProductStar'
import { emptyTitle } from '../../../../../ultis/CommonUlti'
import { styles } from './RecommendProductsStyles'

class RecommendProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listRecommend: []
        }
    }

    componentDidMount() {
        const { homeData } = this.props
        if (homeData && homeData.recommendProducts && homeData.recommendProducts.length > 0) {
            this.setState({ listRecommend: homeData.recommendProducts })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { recommendProducts } = this.props.homeData
        if (prevProps.homeData.recommendProducts !== recommendProducts) {
            this.setState({ listRecommend: recommendProducts })
        }
    }

    render() {
        const { listRecommend } = this.state
        return (
            <View style={styles.container}>
                <FlatList
                    data={listRecommend}
                    keyExtractor={(obj) => Math.random()}
                    renderItem={({ item }) => <ProductStar item={item} navigation={this.props.navigation} />}
                    numColumns={2}
                    ListEmptyComponent={emptyTitle()}
                />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        homeData: state.user.homeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RecommendProducts)