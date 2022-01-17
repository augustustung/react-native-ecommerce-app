import React, { Component } from 'react'
import {
    FlatList,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import Banner from '../screens/Home/Sections/Banner'
import { styles } from "./SuperFlashSaleStyles"
import Product from '../../../components/ProductStar'
import CustomHeader from '../../../components/CustomHeader'
import * as actions from '../../../redux/actions'
import SafeAreaView from '../../../components/SafeAreaView'
import { emptyTitle, headerLeft } from '../../../ultis/CommonUlti'

class SuperFlashSale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listSuperSale: []
        }
    }

    headerRight = () => (
        <TouchableOpacity
            style={styles.iconRight}>
            <Image
                source={require('../../../image/Tab/Search.png')}
                style={styles.icon}
            />
        </TouchableOpacity>
    )

    async componentDidMount() {
        await this.props.getDataSuperSale()

        const { superFlashSale } = this.props
        if (superFlashSale && superFlashSale.length > 0) {
            this.setState({ listSuperSale: superFlashSale })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { superFlashSale } = this.props
        if (prevProps.superFlashSale.length !== superFlashSale.length) {
            this.setState({ listSuperSale: superFlashSale })
        }
    }

    render() {
        const { listSuperSale } = this.state
        const { route, navigation } = this.props
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                        headerRight={this.headerRight}
                    />
                    <Banner onPress={() => { }} />
                    <FlatList
                        data={listSuperSale}
                        keyExtractor={(obj) => Math.random()}
                        renderItem={({ item }) => <Product item={item} navigation={this.props.navigation} />}
                        numColumns={2}
                        style={styles.wrapper}
                        scrollEnabled={false}
                        ListEmptyComponent={emptyTitle(16)}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        superFlashSale: state.user.superFlashSale
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataSuperSale: () => dispatch(actions.getDataSuperSale())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SuperFlashSale)