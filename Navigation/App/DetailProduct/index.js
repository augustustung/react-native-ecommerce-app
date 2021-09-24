import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './DetailProductStyles'
import Swiper from 'react-native-swiper'
import { calculateStar, emptyTitle } from '../../../ultis/CommonUlti'
import ButtonTag from '../../../components/ButtonTag'
import Reviewer from '../../../components/Reviewer'
import * as actions from '../../../redux/actions'
import ProductWithoutStar from '../../../components/ProductWithoutStar'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis/CommonUlti'
import SafeAreaView from '../../../components/SafeAreaView'
import PrimaryBlueButton from '../../../components/PrimaryBlueButton'
import { findProductById } from '../../../services/userService'
import _ from 'lodash'
import Toast from 'react-native-toast-message'
import { ColorConst, USER_ACTION_INTERFACE } from '../../../ultis/constant'
import { normalize } from '../../../ultis/Dimentions'

class DetailProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rate: {},
            selectedSize: null,
            selectedColor: null,
            listRecommend: [],
            currentProduct: {}
        }
    }

    headerRight = () => {
        return (
            <View style={styles.headerRight}>
                <TouchableOpacity style={styles.moreIcon}>
                    <Image
                        source={require('../../../image/Tab/Search.png')}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreIcon}>
                    <Image
                        source={require('../../../image/more.png')}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    async componentDidMount() {
        const { userInfo } = this.props
        const id = this.props.route.params
        const res = await findProductById(id)
        let pro = {}
        if (res && res.errCode === 0)
            pro = res.data

        await this.findProductInWishlist(pro)
        let star = await calculateStar(!_.isEmpty(pro) && pro.reviewProduct)
        this.setState({ rate: star })

        await this.props.getDataRecommend(userInfo)
        this.setState({ listRecommend: this.props.recommendProducts })

    }

    findProductInWishlist = async (pro) => {
        await this.props.getDataWishlist(this.props.userInfo._id)
        const { wishlist } = this.props
        const id = this.props.route.params
        let isFavorite = false
        if (wishlist && wishlist.length > 0) {
            let i = await wishlist.findIndex((element) => element._id === id)
            if (i !== -1)
                isFavorite = true
        }
        this.setState({ currentProduct: { ...pro, isFavorite: isFavorite } })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { recommendProducts } = this.props
        if (prevProps.recommendProducts !== recommendProducts) {
            this.setState({ listRecommend: recommendProducts })
        }
    }

    _onSelectSize = (item) => {
        this.setState({ selectedSize: item, selectedColor: null })
    }

    _onSelectColor = (item) => {
        +item.quantity !== 0 ?
            this.setState({ selectedColor: item })
            :
            Alert.alert("Sorry, this color is out of stock!")
    }

    _onChangeWishlist = async () => {
        const { currentProduct } = this.state
        let action = currentProduct.isFavorite ? USER_ACTION_INTERFACE.DELETE : USER_ACTION_INTERFACE.ADD
        //call api change db
        try {
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: action
            }, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: action
            }, this.props.accessToken)
        }
        await this.findProductInWishlist(currentProduct)
    }

    _onAddToCart = async () => {
        const { selectedSize, selectedColor } = this.state
        if (!selectedSize) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Please choose a size first!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else if (!selectedColor) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Please choose a color!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        }
        else {
            const { currentProduct } = this.state
            //call api change db
            try {
                await this.props.handleChangeCart({
                    userId: this.props.userInfo._id,
                    actions: USER_ACTION_INTERFACE.ADD,
                    productId: currentProduct._id,
                    productName: currentProduct.name,
                    productImage: currentProduct.image[0],
                    selectedSize: parseFloat(selectedSize.label),
                    selectedColor: selectedColor.color,
                    price: currentProduct.saleOff ? currentProduct.saleOff : currentProduct.price
                }, this.props.accessToken)
                await this.props.handleGetDataCart(this.props.userInfo._id, this.props.accessToken)
            } catch (e) {
                await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
                await this.props.handleChangeCart({
                    userId: this.props.userInfo._id,
                    actions: USER_ACTION_INTERFACE.ADD,
                    productId: currentProduct._id,
                    productName: currentProduct.name,
                    productImage: currentProduct.image[0],
                    selectedSize: parseFloat(selectedSize.label),
                    selectedColor: selectedColor.color,
                    price: currentProduct.saleOff ? currentProduct.saleOff : currentProduct.price
                }, this.props.accessToken)
                await this.props.handleGetDataCart(this.props.userInfo._id, this.props.accessToken)
            }

            this.setState({
                selectedSize: null,
                selectedColor: null
            })
        }
    }

    render() {
        const { rate, selectedSize, selectedColor, listRecommend, currentProduct } = this.state
        const { navigation } = this.props
        const firstUserComment = !_.isEmpty(currentProduct)
            && currentProduct.reviewProduct
            && currentProduct.reviewProduct.length > 0
            ? currentProduct.reviewProduct[0] : {}

        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() =>
                            headerLeft({
                                navigation: navigation,
                                routeName: currentProduct.name ? currentProduct.name : '',
                                width: 0.515
                            })}
                        headerRight={this.headerRight}
                    />
                    <View style={styles.wrapper}>
                        <Swiper
                            paginationStyle={styles.customStyleSwiperDot}
                            loop={false}
                        >
                            {
                                currentProduct.image &&
                                    currentProduct.image.length > 0
                                    ? currentProduct.image.map((item, index) =>
                                    (
                                        <Image key={item + index} source={{ uri: item }} style={styles.productImg} />
                                    )) :
                                    (
                                        <>
                                            <View style={styles.slide1} />
                                            <View style={styles.slide2} />
                                            <View style={styles.slide3} />
                                        </>
                                    )
                            }
                        </Swiper>
                    </View>

                    <View style={styles.productNameWrapper}>
                        <Text style={styles.productName} numberOfLines={2}>{currentProduct.name}</Text>

                        <TouchableOpacity onPress={this._onChangeWishlist}>
                            <Image
                                source={currentProduct.isFavorite
                                    ? require('../../../image/wishlistAdded.png')
                                    : require('../../../image/wishlist.png')
                                }
                                style={styles.favoriteBtn}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rate}>
                        {
                            rate.arrStar && rate.arrStar.length > 0 && rate.arrStar.map((item, index) => (
                                <Image
                                    key={item + Math.random()}
                                    source={
                                        +item === 1 ?
                                            require('../../../image/star.png') :
                                            require('../../../image/unstar.png')
                                    }
                                    style={styles.starIcon}
                                />)
                            )
                        }
                    </View>

                    <Text style={styles.productPrice}>${currentProduct.saleOff ? currentProduct.saleOff : currentProduct.price}</Text>

                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <FlatList
                        data={currentProduct.selectSize}
                        keyExtractor={obj => obj.label + Math.random()}
                        horizontal={true}
                        style={{ marginBottom: 24, marginLeft: 16 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={[
                                    styles.selectSize,
                                    { borderColor: selectedSize && selectedSize.label === item.label ? ColorConst.PRIMARY_BLUE : ColorConst.NEUTRAL_LIGHT }]}
                                onPress={() => this._onSelectSize(item)}
                            >
                                <Text style={styles.label}>{item.label}</Text>
                            </TouchableOpacity>
                        }
                    />

                    <Text style={styles.sectionTitle}>Select Color</Text>

                    {
                        selectedSize ?
                            <FlatList
                                data={selectedSize.color}
                                keyExtractor={obj => obj.color}
                                horizontal={true}
                                style={{ marginLeft: 16, marginBottom: 24 }}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        style={[
                                            styles.selectSize,
                                            {
                                                borderWidth: 0,
                                                backgroundColor: item.color,
                                                opacity: +item.quantity === 0 ? 0.5 : 1
                                            }
                                        ]}
                                        onPress={() => this._onSelectColor(item)}
                                    >
                                        {
                                            selectedColor &&
                                            selectedColor.id === item.id &&
                                            <View style={styles.selectedColor} />
                                        }
                                    </TouchableOpacity>
                                }
                            /> : <Text style={styles.emptyColor}>Please choose a size first.</Text>
                    }

                    <Text style={styles.sectionTitle}>Specification</Text>
                    <View style={styles.shown}>
                        <Text style={styles.specificationTitle}>Shown</Text>
                        <Text
                            style={styles.specificationContent}
                            numberOfLines={3}
                        >{
                                !_.isEmpty(currentProduct)
                                && !_.isEmpty(currentProduct.specification)
                                && currentProduct.specification.shown
                            }</Text>
                    </View>
                    <View style={styles.style}>
                        <Text style={styles.specificationTitle}>Style</Text>
                        <Text
                            style={styles.specificationContent}
                        >{
                                !_.isEmpty(currentProduct)
                                && !_.isEmpty(currentProduct.specification)
                                && currentProduct.specification.style}</Text>
                    </View>
                    <View style={styles.style}>
                        <Text style={styles.description}>
                            {!_.isEmpty(currentProduct)
                                && !_.isEmpty(currentProduct.specification)
                                && currentProduct.specification.description
                            }
                        </Text>
                    </View>

                    <View style={{ marginHorizontal: normalize(16) }}>
                        <ButtonTag
                            title="Review Product"
                            btnTitle="See More"
                            OnPress={() => this.props.navigation.push("Review Product", currentProduct.reviewProduct)}
                        />
                        <View style={[styles.rate, { marginHorizontal: 0, marginTop: normalize(8) }]}>
                            {
                                rate.arrStar && rate.arrStar.length > 0 && rate.arrStar.map((item, index) => (
                                    <Image
                                        key={index + Math.random()}
                                        source={
                                            +item === 1 ?
                                                require('../../../image/star.png') :
                                                require('../../../image/unstar.png')
                                        }
                                        style={styles.starIcon}
                                    />)
                                )
                            }
                            <Text style={styles.rateAverage}>
                                {rate.average}
                                <Text style={styles.rateReview}>
                                    ({!_.isEmpty(currentProduct)
                                        && currentProduct.reviewProduct
                                        && currentProduct.reviewProduct.length} Review)
                                </Text>
                            </Text>
                        </View>

                        <Reviewer userComment={firstUserComment} />
                    </View>
                    <Text style={styles.sectionTitle}>You Might Also Like</Text>
                    <FlatList
                        horizontal={true}
                        data={listRecommend}
                        keyExtractor={(obj) => obj.id + Math.random()}
                        style={{ marginLeft: normalize(16), marginBottom: normalize(19) }}
                        renderItem={({ item }) => <ProductWithoutStar item={item} navigation={this.props.navigation} />}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={emptyTitle()}
                    />


                    <PrimaryBlueButton
                        title="Add To Cart"
                        onPress={this._onAddToCart}
                        marginBottom={normalize(18)}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        recommendProducts: state.user.recommendProducts,
        userInfo: state.app.userInfo,
        wishlist: state.user.wishlist,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataRecommend: (userInfo) => dispatch(actions.getDataRecommend(userInfo, 6)),
        handleChangeWishlist: (dataAction, token) => dispatch(actions.handleChangeWishlist(dataAction, token)),
        handleChangeCart: (data, token) => dispatch(actions.handleChangeCart(data, token)),
        getDataWishlist: (userId) => dispatch(actions.getDataWishlist(userId)),
        handleGetDataCart: (userId, token) => dispatch(actions.getDataCart(userId, token)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DetailProducts)