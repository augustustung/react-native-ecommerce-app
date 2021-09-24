import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import SafeAreaView from '../../../../../components/SafeAreaView'
import _ from 'lodash'
import Card from '../../../../../components/Card'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import CustomHeader from '../../../../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../../../../ultis/CommonUlti'
import { normalize, normalizeV } from '../../../../../ultis/Dimentions'

class ViewCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listCard: []
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


    //0 credit 1 paypal 2 bank
    getListCard = (objList) => {
        const typeCard = this.props.route.params
        if (typeCard === 0 && objList.credit.length > 0)
            this.setState({ listCard: [...objList.credit] })
        else if (typeCard === 1 && objList.paypal.length > 0)
            this.setState({ listCard: objList.paypal })
        else if (typeCard === 1 && objList.bank.length > 0)
            this.setState({ listCard: objList.bank })
    }

    render() {
        const { listCard } = this.state
        const { navigation } = this.props

        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: "Credit Card And Debit" })}
                    />

                    {listCard && listCard.length > 0 ? listCard.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                marginHorizontal: normalize(16),
                                marginTop: normalizeV(16)
                            }}>
                            <Card key={index} item={item} i={index} />
                        </View>
                    )) : (
                        emptyTitle(20, "You don't have any card. Create now")
                    )
                    }

                </ScrollView>
                <PrimaryBlueButton
                    title="Add Card"
                    onPress={() => navigation.navigate("Create Card")}
                    marginBottom={normalizeV(16)}
                />

            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewCard)