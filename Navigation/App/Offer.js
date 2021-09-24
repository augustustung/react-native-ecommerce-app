import React, { Component } from 'react'
import {
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import SafeAreaView from '../../components/SafeAreaView'
import CustomHeader from '../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../ultis/CommonUlti'
import Notificate from '../../components/Notificate'
import { styles } from './Notification/NotificationStyles'
import { normalize } from '../../ultis/Dimentions'
import { getDetailNotificationOffer } from '../../services/userService'
import { handleGenerateNewToken } from '../../redux/actions'

class Offer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listOffer: []
        }
    }

    async componentDidMount() {
        await this._onHandleUpdate()
    }

    _onHandleUpdate = async () => {
        let res = {}
        try {
            res = await getDetailNotificationOffer(this.props.accessToken)
        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            res = await getDetailNotificationOffer(this.props.accessToken)
        }
        if (res && res.errCode === 0)
            this.setState({
                listOffer: res.data
            })
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { offer } = this.props.userInfo.notification
        if (prevProps.userInfo.notification.offer.length !== offer.length) {
            await this._onHandleUpdate()
        }
    }

    IconLeft = () => (
        <Image
            source={require('../../image/Tab/OfferFocus.png')}
            style={styles.iconLeft}
        />
    )

    contentRight = (info) => {
        const { navigation } = this.props
        return (
            <TouchableOpacity
                onPress={() => { }}
                style={styles.subTitleRight}
            >
                <Text style={[styles.title, { marginBottom: 8, lineHeight: normalize(21) }]}>{info.title}</Text>
                <Text style={styles.subTitle}>{info.subtitle}</Text>
                <Text style={styles.time}>{info.notificationTime}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation, route } = this.props
        const { listOffer } = this.state
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />
                {
                    listOffer.length > 0 ? listOffer.map((item, index) => {
                        return (
                            <Notificate
                                key={index}
                                contentLeft={() => this.IconLeft()}
                                contentRight={() => this.contentRight(item)}
                            />
                        )
                    }) : (
                        emptyTitle(20, "You don't have any offer right now")
                    )
                }

            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo,
        accessToken: state.app.accessToken,
        refreshToken: state.app.refreshToken
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleGetNewToken: (refreshToken, userId) => dispatch(handleGenerateNewToken(refreshToken, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Offer)