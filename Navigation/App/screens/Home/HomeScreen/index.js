import React, { Component } from 'react'
import {
    ScrollView,
    LogBox,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../../../redux/actions'
import Banner from '../Sections/Banner'
import Category from '../Sections/Category'
import FlashSale from '../Sections/FlashSale'
import MegaSale from '../Sections/MegaSale'
import OutStandingBanner from '../../../../../components/OutstandingBanner'
import RecommendProducts from '../Sections/RecommendProducts'
import SafeAreaView from '../../../../../components/SafeAreaView'
import CustomModal from '../../../../../components/CustomModal'
import HeaderSearch from '../../../../../components/HeaderSearch'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textSearch: ""
        }
    }

    async componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        await this.props.getDataHome(this.props.userInfo)
    }

    setTextSearch = (textSearch) => {
        this.setState({ textSearch })
    }

    render() {
        const { navigation, userInfo } = this.props
        const { textSearch } = this.state
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderSearch
                        navigation={navigation}
                        userInfo={userInfo}
                        textSearch={textSearch}
                        setTextSearch={this.setTextSearch.bind(this)}
                    />
                    <Banner onPress={() => navigation.navigate("Super Flash Sale")} />
                    <Category navigation={navigation} />
                    <FlashSale navigation={navigation} />
                    <MegaSale navigation={navigation} />
                    <OutStandingBanner
                        title="Recommended Product"
                        subTitle="We recommend the best for you"
                    />
                    <RecommendProducts navigation={navigation} />

                </ScrollView>
                {
                    textSearch.length > 0 &&
                    <CustomModal
                        textSearch={textSearch}
                        navigation={navigation}
                    />
                }
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
        getDataHome: (userInfo) => dispatch(actions.getHomeData(userInfo))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)