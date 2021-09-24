import React, { Component } from 'react'
import {
    Text,
    FlatList,
    ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import ProductStar from '../../../components/ProductStar'
import * as actions from '../../../redux/actions'
import CustomHeader from '../../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../../ultis/CommonUlti'
import SafeAreaView from '../../../components/SafeAreaView'
import { normalize, normalizeV } from '../../../ultis/Dimentions'
import { USER_ACTION_INTERFACE } from '../../../ultis/constant'

class FavoriteProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listFavorite: []
        }
    }

    async componentDidMount() {
        const { userInfo } = this.props
        await this.props.getDataWishlist(userInfo._id)
        const { wishlist } = this.props
        if (wishlist && wishlist.length > 0) {
            this.setState({ listFavorite: wishlist })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { wishlist } = this.props
        if (prevProps.wishlist.length !== wishlist.length) {
            this.setState({ listFavorite: wishlist })
        }
    }

    handleDeleteFromWishlist = async (currentProduct) => {
        try {
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: USER_ACTION_INTERFACE.DELETE
            }, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: USER_ACTION_INTERFACE.DELETE
            }, this.props.accessToken)
        }
        await this.props.getDataWishlist(this.props.userInfo._id)
    }

    render() {
        const { listFavorite } = this.state
        const { navigation, route } = this.props
        return (
            <SafeAreaView>
                <ScrollView>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                    />

                    <FlatList
                        data={listFavorite}
                        keyExtractor={(obj) => obj.name + obj.id}
                        renderItem={({ item }) =>
                            <ProductStar
                                item={item}
                                navigation={this.props.navigation}
                                uri={require('../../../image/trash.png')}
                                handleDeleteFromWishlist={this.handleDeleteFromWishlist}
                            />
                        }
                        numColumns={2}
                        style={{ marginLeft: normalize(16), marginTop: normalizeV(16) }}
                        scrollEnabled={false}
                        ListEmptyComponent={emptyTitle(0, "Wishlist is empty. Go shopping now!")}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        wishlist: state.user.wishlist,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataWishlist: (userId) => dispatch(actions.getDataWishlist(userId)),
        handleChangeWishlist: (dataAction, token) => dispatch(actions.handleChangeWishlist(dataAction, token)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FavoriteProducts)