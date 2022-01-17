import React, { Component } from 'react'
import {
    FlatList,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'
import { headerLeft } from '../../../../../ultis/CommonUlti'
import SafeAreaView from '../../../../../components/SafeAreaView'
import _ from 'lodash'
import CustomHeader from '../../../../../components/CustomHeader'
import { fineOrderById, getAllcodeType } from '../../../../../services/userService'
import { styles } from './OrderStyles'
import CartItem from '../../../../../components/CartItem'
import * as actions from '../../../../../redux/actions'
import { connect } from 'react-redux'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import { normalize, normalizeV } from '../../../../../ultis/Dimentions'
import Toast from 'react-native-toast-message'

class OrderDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listActions: [],
            orderDetail: {}
        }
    }

    async componentDidMount() {
        await this.reRenderData()
    }

    reRenderData = async () => {
        const { userInfo, route, accessToken, refreshToken } = this.props

        await this.props.getDataWishlist(userInfo._id)

        //get data res nếu token hết hạn thì fetch cái mới
        let dataRes = {};
        try {
            dataRes = await fineOrderById(route.params, accessToken)
        } catch (e) {
            await this.props.handleGenerateToken(refreshToken, userInfo._id)
            dataRes = await fineOrderById(route.params, this.props.accessToken)
        }

        if (dataRes && dataRes.errCode === 0) {
            const buildData = await this.buildData(dataRes.data)
            const status = await this._onGetStatusItem()
            this.setState({ orderDetail: buildData, listActions: status })
        }

        //else thì cái action fetch token mới tự đẩy user ra login screen
    }

    buildData = async (data) => {
        const { wishlist } = this.props
        for (let i = 0; i < data.productId.length; i++) {
            const isFavorite = await wishlist.some(item => item._id === data.productId[i]._id);
            data.productId[i].isFavorite = isFavorite;
        }

        return data
    }

    _onGetStatusItem = async () => {
        const re = []
        let res = await getAllcodeType("SHIPPING")
        if (res && res.errCode === 0) {
            for (let i = 0; i < res.data.length; i++) {
                re.push({
                    id: i,
                    title: res.data[i].value
                })
            }
        }
        return re
    }


    _onHandleChangeWishlist = async (currentProduct) => {
        let action = currentProduct.isFavorite ? "DELETE" : "ADD"
        //call api change db
        try {
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: action
            }, this.props.accessToken)
        } catch (error) {
            await this.props.handleGenerateToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.handleChangeWishlist({
                userId: this.props.userInfo._id,
                itemId: currentProduct._id,
                actions: action
            }, this.props.accessToken)
        }

        await this.reRenderData()
    }

    turnOnNotification = () => {
        //do something

        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Successfully',
            text2: "Turn on notify succeed!",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        })
    }


    render() {
        const { navigation, route } = this.props
        const { orderDetail, listActions } = this.state

        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                    />

                    {!_.isEmpty(orderDetail) && (
                        <>
                            <View style={{ marginHorizontal: normalize(19) }}>
                                <FlatList
                                    data={listActions}
                                    showsHorizontalScrollIndicator={false}
                                    scrollEnabled={false}
                                    keyExtractor={obj => Math.random() * 10}
                                    horizontal={true}
                                    style={{ flexGrow: 0 }}
                                    renderItem={({ item }) => {
                                        const currentNumber = Number(orderDetail.status[orderDetail.status.length - 1])
                                        return (
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        source={
                                                            currentNumber >= item.id ?
                                                                require('../../../../../image/success.png') :
                                                                require('../../../../../image/waiting.png')
                                                        }
                                                        style={styles.action}
                                                    />
                                                    {item.id < 3 && <View
                                                        style={[styles.line, {
                                                            borderBottomColor: currentNumber - 1 >= item.id
                                                                ? "#40BFFF"
                                                                : "#EBF0FF"
                                                        }]}

                                                    />}
                                                </View>
                                                <Text style={styles.status}>{item.title}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={styles.wrapper}>
                                <Text style={[styles.title, { marginLeft: 0 }]}>Product</Text>
                                <FlatList
                                    data={orderDetail.productId}
                                    keyExtractor={obj => obj._id}
                                    style={{ marginTop: normalize(16) }}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                    renderItem={({ item }) =>
                                        <CartItem
                                            item={item}
                                            handleChangeWishlist={this._onHandleChangeWishlist}
                                            navigate={() => navigation.navigate("Detail Product", item._id)}
                                            showDelete={false}
                                            showAdjustQuantity={false}
                                        />}
                                />
                            </View>

                            <Text style={styles.title}>Shipping Details</Text>
                            <View
                                style={styles.item}
                            >
                                <View style={styles.sections}>
                                    <Text style={styles.text}>Date Shipping</Text>
                                    <Text style={styles.sectionContent}>
                                        {orderDetail.dateShipping}
                                    </Text>
                                </View>

                                <View style={styles.sections}>
                                    <Text style={styles.text}>Shipping</Text>
                                    <Text style={styles.sectionContent}>
                                        {orderDetail.shipping}
                                    </Text>
                                </View>

                                <View style={styles.sections}>
                                    <Text style={styles.text}>No. Resi</Text>
                                    <Text style={[styles.sectionContent, { color: "#40BFFF" }]}>
                                        {orderDetail.resi}
                                    </Text>
                                </View>

                                <View style={styles.sections}>
                                    <Text style={styles.text}>Address</Text>
                                    <Text style={styles.sectionContent}>
                                        {orderDetail.address}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.title}>Payment Details</Text>
                            <View
                                style={styles.item}
                            >
                                <View style={styles.sections}>
                                    <Text style={styles.text}>Items ({orderDetail.productId.length})</Text>
                                    <Text style={styles.sectionContent}>
                                        {orderDetail.sumProduct}
                                    </Text>
                                </View>

                                <View style={styles.sections}>
                                    <Text style={styles.text}>Shipping</Text>
                                    <Text style={styles.sectionContent}>
                                        {"$" + orderDetail.shippingFee.toFixed(2)}
                                    </Text>
                                </View>

                                <View style={styles.sections}>
                                    <Text style={styles.text}>Import charges</Text>
                                    <Text style={styles.sectionContent}>
                                        {"$" + orderDetail.charge.toFixed(2)}
                                    </Text>
                                </View>

                                <Image
                                    source={require('../../../../../image/line.png')}
                                    style={styles.divide}
                                />

                                <View style={styles.sections}>
                                    <Text style={styles.text}>Total Price</Text>
                                    <Text style={[styles.sectionContent, { color: "#40BFFF" }]}>
                                        ${orderDetail.total}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                    <View style={{ height: normalizeV(21) }} />
                    <PrimaryBlueButton
                        title="Notify Me"
                        onPress={this.turnOnNotification}
                        marginBottom={normalizeV(16)}
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
        handleChangeWishlist: (id, action) => dispatch(actions.handleChangeWishlist(id, action)),
        getDataWishlist: (userId) => dispatch(actions.getDataWishlist(userId)),
        handleGenerateToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
