import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './CartScreenStyles'
import SafeAreaView from '../../../../../components/SafeAreaView'
import CustomeHeader from '../../../../../components/CustomHeader'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import {
    applyCuponCode
} from '../../../../../services/userService'
import * as actions from '../../../../../redux/actions'
import CardItem from '../../../../../components/CartItem'
import _ from 'lodash'
import Toast from 'react-native-toast-message'
import { emptyTitle } from '../../../../../ultis/CommonUlti'
import { normalizeV, SCREEN_HEIGHT } from '../../../../../ultis/Dimentions'
import { USER_ACTION_INTERFACE } from '../../../../../ultis/constant'

class CartScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            code: '',
            borderColor: '#EBF0FF',
            message: {},
            color: "#EBF0FF"
        }
    }

    async componentDidMount() {
        await this.buildDataCart()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { cartProps, wishlist } = this.props
        if (prevProps.cartProps.length !== cartProps.length) {
            await this.buildDataCart()
        }
        if (prevProps.wishlist.length !== wishlist.length)
            await this.buildDataCart()
    }

    checkChangeQuantity = (prev, current) => {
        for (let i = 0; i < prev.length; i++) {
            if (prev[i].quantity !== current[i].quantity)
                return true
        }
        return false
    }

    _onHandleApply = async () => {
        if (!this.state.code) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Cupon Code Isn't Valid",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
            return
        }

        Keyboard.dismiss()
        let res = {}
        try {
            res = await applyCuponCode(this.state.code, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            res = await applyCuponCode(this.state.code, this.props.accessToken)
        }
        if (res && res.errCode === 0)
            this.setState({
                message: res,
                borderColor: "#53D1B6",
                color: "#53D1B6"
            })
        else {
            this.setState({
                message: res,
                borderColor: "#FB7181",
                color: "#FB7181"
            })
        }
    }

    buildDataCart = async () => {
        const { userInfo } = this.props
        try {
            await this.props.handleGetDataCart(userInfo._id, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleGetDataCart(userInfo._id, this.props.accessToken)
        }

        //fetch xong mới lấy data
        const { cartProps } = this.props
        if (cartProps.length === 0) {
            this.state.cart.length !== 0 ? this.setState({ cart: [] }) : 0
            return
        }

        //fetch xong mới lấy data
        await this.props.getDataWishlist(userInfo._id)
        const { wishlist } = this.props
        for (let i = 0; i < cartProps.length; i++) {
            let findIndex = await wishlist.findIndex((element) => element._id === cartProps[i].productId)
            if (findIndex !== -1)
                cartProps[i] = { ...cartProps[i], isFavorite: true }
            else
                cartProps[i] = { ...cartProps[i], isFavorite: false }
        }

        this.setState({ cart: cartProps })
        await this.props.calculateBill(cartProps)
    }

    _onHandleChangeWishlist = async (currentProduct) => {
        let action = currentProduct.isFavorite ? USER_ACTION_INTERFACE.DELETE : USER_ACTION_INTERFACE.ADD
        //call api change db
        try {
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct.productId,
                actions: action
            }, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct.productId,
                actions: action
            }, this.props.accessToken)
        }
        await this.props.getDataWishlist(this.props.userInfo._id)
        await this.buildDataCart()
    }

    _onRemoveFromCart = async (currentProduct) => {
        //call api change db
        try {
            await this.props.handleChangeCart({
                userId: this.props.userInfo._id,
                actions: USER_ACTION_INTERFACE.DELETE,
                productId: currentProduct.productId
            }, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeCart({
                userId: this.props.userInfo._id,
                actions: USER_ACTION_INTERFACE.DELETE,
                productId: currentProduct.productId
            }, this.props.accessToken)
        }
        await this.buildDataCart()
    }

    _onChangeQuantity = async (item, action) => {
        try {
            await this.props.handleChangeQuantity({
                userId: this.props.userInfo._id,
                actions: action,
                productId: item.productId
            }, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeQuantity({
                userId: this.props.userInfo._id,
                actions: action,
                productId: item.productId
            }, this.props.accessToken)
        }
        await this.buildDataCart()
    }

    handleCheckout = () => {
        const { cart } = this.state
        if (cart.length === 0)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "Your cat is empty!",
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        else {
            //do somethings
            this.props.navigation.navigate("Ship")
        }
    }

    render() {
        const { cart, code, borderColor, message, color } = this.state
        const { navigation, bill } = this.props
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <CustomeHeader
                        headerLeft={() =>
                            <View style={styles.headerWrapper}>
                                <Text style={styles.headerTitle}>Your Cart</Text>
                            </View>
                        }
                    />
                    <FlatList
                        style={styles.containerItems}
                        data={cart}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(obj) => obj._id}
                        renderItem={({ item }) =>
                            item && !_.isEmpty(item) && <CardItem
                                item={item}
                                handleChangeWishlist={() => this._onHandleChangeWishlist(item)}
                                removeFromCart={this._onRemoveFromCart}
                                navigate={() => navigation.navigate("Detail Product", item.productId)}
                                changeQuantity={this._onChangeQuantity}
                                showDelete={true}
                                showAdjustQuantity={true}
                            />
                        }
                        ListEmptyComponent={emptyTitle(16, "You don't have any item. Shopping now!")}
                    />

                    <View style={[styles.code, { marginBottom: !message || _.isEmpty(message) ? SCREEN_HEIGHT * 8 / 367 : 0 }]}>
                        <TextInput
                            placeholder="Cupon Code: 123456"
                            value={code}
                            onChangeText={(text) => this.setState({ code: text })}
                            style={[styles.enterCode,
                            {
                                fontWeight: code ? "700" : "400",
                                borderColor: borderColor
                            }
                            ]}
                        />
                        <TouchableOpacity style={styles.apply} onPress={this._onHandleApply}>
                            <Text style={styles.applyTitle}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    {message && !_.isEmpty(message) && <Text style={[styles.message, { color: color }]}>
                        * {message && message.errCode === 0 ? message.message : message.errMessage}
                    </Text>}


                    <View style={styles.bill}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Items ({cart.length})</Text>
                            <Text style={styles.sectionContent}>${!_.isEmpty(bill) && cart.length > 0 ? bill.sumProduct : "00.00"}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Shipping</Text>
                            <Text style={styles.sectionContent}>${cart.length > 0 ? "40.00" : "00.00"}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Import charges</Text>
                            <Text style={styles.sectionContent}>
                                ${!_.isEmpty(bill) && cart.length > 0 ? "128.00" : "00.00"}
                            </Text>
                        </View>

                        <Image
                            style={styles.divide}
                            source={require('../../../../../image/line.png')}
                        />

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: '#223263' }]}>Total Price</Text>
                            <Text style={[
                                styles.sectionContent,
                                { color: "#40BFFF", fontWeight: '700' }
                            ]}>${!_.isEmpty(bill) && cart.length > 0 ? bill.total : "00.00"}</Text>
                        </View>
                    </View>

                    <PrimaryBlueButton
                        title="Check Out"
                        onPress={this.handleCheckout}
                        marginBottom={normalizeV(16)}
                    />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        bill: state.app.currentBill,
        cartProps: state.user.cart,
        wishlist: state.user.wishlist,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetDataCart: (userId, token) => dispatch(actions.getDataCart(userId, token)),
        handleChangeWishlist: (dataAction, token) => dispatch(actions.handleChangeWishlist(dataAction, token)),
        handleChangeCart: (data, token) => dispatch(actions.handleChangeCart(data, token)),
        handleChangeQuantity: (data, token) => dispatch(actions.handleChangeQuantity(data, token)),
        calculateBill: (cart) => dispatch(actions.calculateOrResetBill("BUY", cart)),
        getDataWishlist: (userId) => dispatch(actions.getDataWishlist(userId)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)