import React, { Component } from 'react'
import {
    FlatList,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../../../../components/CustomHeader'
import SafeAreaView from '../../../../../components/SafeAreaView'
import { emptyTitle, headerLeft } from '../../../../../ultis/CommonUlti'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import AddressItem from '../../../../../components/AddressItem'
import { styles } from '../CartScreen/CartScreenStyles'
import { normalizeV } from '../../../../../ultis/Dimentions'
import * as actions from '../../../../../redux/actions'

class ShipTo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listAddress: [],
            err: "",
            selectedAddress: null
        }
    }

    headerRight = () => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                style={styles.btnHeader}
                //passing "ADD" to indentify wanna create 
                onPress={() => navigation.navigate("Add Or Edit Address", "ADD")}
            >
                <Image
                    source={require('../../../../../image/bluePlus.png')}
                    style={styles.headerRight}
                />
            </TouchableOpacity>
        )
    }

    async componentDidMount() {
        const { userInfo } = this.props
        try {
            await this.props.getAllAddress(userInfo._id, this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            await this.props.getAllAddress(userInfo._id, this.props.accessToken)
        }

        const { address } = this.props
        if (address && address.length > 0) {
            this.setState({ listAddress: address })
        } else {
            this.state.listAddress.length !== 0 ? this.setState({ listAddress: [] }) : 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { address } = this.props
        if (prevProps.address.length !== address.length) {
            this.setState({ listAddress: address })
        }
    }

    handleChoose = (item) => {
        this.setState({ selectedAddress: item, err: "" })
    }

    handleEdit = (item) => {
        this.props.navigation.navigate("Add Or Edit Address", item._id)
    }

    handleDelete = (item) => {
        this.props.navigation.navigate("Delete Address", item._id)
    }

    getBorderColor = (item) => {
        const { selectedAddress } = this.state
        if (selectedAddress && selectedAddress._id === item._id)
            return "#40BFFF"
        return "#EBF0FF"

    }

    render() {
        const { listAddress, err } = this.state
        const { navigation } = this.props
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: "Ship to" })}
                    headerRight={this.headerRight}
                />

                <FlatList
                    data={listAddress}
                    keyExtractor={obj => obj.city}
                    showsVerticalScrollIndicator={false}
                    style={styles.wrapper}
                    renderItem={({ item }) =>
                        <AddressItem
                            item={item}
                            borderColor={this.getBorderColor(item)}
                            handleEdit={this.handleEdit}
                            handleDelete={this.handleDelete}
                            handleChoose={this.handleChoose}
                        />
                    }
                    ListEmptyComponent={emptyTitle(0, "You dont have any address. Create Now")}
                />
                {err.length > 0 && <Text style={styles.err}>{err}</Text>}
                <PrimaryBlueButton
                    title="Next"
                    onPress={() => {
                        this.setState({ err: '' })
                        if (!this.state.selectedAddress)
                            this.setState({ err: "Please choose an address" })
                        else navigation.navigate("Payment", "CHOOSE_CART")
                    }}
                    marginBottom={normalizeV(16)}
                />
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        address: state.user.address,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllAddress: (userId, token) => dispatch(actions.handleGetAllAddress(userId, token)),
        handleGetNewToken: (refreshToken, userId) => dispatch(actions.handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ShipTo)