import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import SafeAreaView from '../../../../../components/SafeAreaView'
import _ from 'lodash'
import { styles } from './ChooseCardStyles'
import Card from '../../../../../components/Card'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import CustomHeader from '../../../../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../../../../ultis/CommonUlti'
import { normalizeV } from '../../../../../ultis/Dimentions'
import { handleOrder } from '../../../../../services/userService'

class ChooseCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listCard: [],
            //select card at index
            cardIndex: 0
        }
    }

    componentDidMount() {
        const { userInfo } = this.props
        if (userInfo.payment && !_.isEmpty(userInfo.payment)) {
            this.getListCard(userInfo.payment)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { payment } = this.props.userInfo
        if (prevProps.userInfo.payment !== payment)
            this.getListCard(payment)
    }

    getListCard = (objList) => {
        const typeCard = this.props.route.params
        if (typeCard === 0 && objList.credit.length > 0)
            this.setState({ listCard: [...objList.credit] })
        else if (typeCard === 1 && objList.paypal.length > 0)
            this.setState({ listCard: objList.paypal })
        else if (typeCard === 1 && objList.bank.length > 0)
            this.setState({ listCard: objList.bank })
    }

    headerRight = () => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Create Card")}
            >
                <Image
                    source={require('../../../../../image/bluePlus.png')}
                    style={styles.headerRight}
                />
            </TouchableOpacity>
        )
    }

    handleSubmitBuy = async () => {
        const { navigation, userInfo } = this.props
        if (this.state.listCard.length > 0) {
            //do something
            await handleOrder({ userId: userInfo._id })
            navigation.navigate("Order Success")
        } else {
            navigation.navigate("Create Card")
        }
    }

    render() {
        const { listCard, cardIndex } = this.state
        const { navigation, route, bill } = this.props
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name, width: 0.515 })}
                    headerRight={this.headerRight}
                />
                <View style={styles.top}>
                    <View style={styles.swiper}>
                        <Swiper
                            paginationStyle={styles.customStyleSwiperDot}
                            loop={false}
                            index={cardIndex}
                            onIndexChanged={(newIndex) => this.setState({ cardIndex: newIndex })}
                        >
                            {
                                listCard && listCard.length > 0
                                    ? listCard.map((item, index) =>
                                    (
                                        <Card key={index} item={item} i={index} />
                                    )) :
                                    (
                                        emptyTitle(0, "You have no card")
                                    )
                            }
                        </Swiper>
                    </View>
                </View>

                <PrimaryBlueButton
                    title={listCard.length > 0 ? 'Pay $' + bill.total : "Add Card"}
                    onPress={this.handleSubmitBuy}
                    marginBottom={normalizeV(16)}
                />
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        bill: state.app.currentBill
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChooseCard)