import React, { Component } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import SafeAreaView from '../../components/SafeAreaView'
import CustomHeader from '../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../ultis/CommonUlti'
import Notificate from '../../components/Notificate'
import { styles } from './Notification/NotificationStyles'
import { normalize } from '../../ultis/Dimentions'
import { getDetailNotificationFeed } from '../../services/userService'
import { handleGenerateNewToken } from '../../redux/actions'

class Feed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listFeed: []
        }
    }

    async componentDidMount() {
        await this._onHandleUpdate()
    }

    _onHandleUpdate = async () => {
        let res = {}
        try {
            res = await getDetailNotificationFeed(this.props.accessToken)

        } catch (e) {
            await this.props.handleGetNewToken(this.props.refreshToken, this.props.userInfo._id)
            res = await getDetailNotificationFeed(this.props.accessToken)
        }
        if (res && res.errCode === 0)
            this.setState({
                listFeed: res.data
            })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const { feed } = this.props.userInfo.notification
        if (prevProps.userInfo.notification.feed.length !== feed.length) {
            await this._onHandleUpdate()
        }
    }

    IconLeft = (uri) => (
        <Image
            source={{ uri: uri }}
            style={styles.imageLeft}
        />
    )

    contentRight = (info) => {
        return (
            <TouchableOpacity
                onPress={() => { }}
                style={styles.subTitleRight}
            >
                <Text style={[styles.title, { marginBottom: normalize(8), lineHeight: normalize(21) }]}>{info.title}</Text>
                <Text style={styles.subTitle}>{info.subtitle}</Text>
                <Text style={styles.time}>{info.notificationTime}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation, route } = this.props
        const { listFeed } = this.state
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />
                {
                    listFeed.length > 0 ? listFeed.map((item, index) => {
                        return (
                            <Notificate
                                key={index}
                                contentLeft={() => this.IconLeft(item.image)}
                                contentRight={() => this.contentRight(item)}
                            />
                        )
                    }) : (
                        emptyTitle(20, "You don't have any new feed right now")
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


export default connect(mapStateToProps, mapDispatchToProps)(Feed)