import { styles } from './Category/CategoryStyles'
import SafeAreaView from '../../components/SafeAreaView'
import { headerLeft } from '../../ultis/CommonUlti'
import CustomHeader from '../../components/CustomHeader'
import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'


class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listPaymentState: []
        }
    }

    async componentDidMount() {
        const { listPayment } = this.props
        if (listPayment && listPayment.length > 0)
            this.setState({ listPaymentState: listPayment })
        else
            await this.props.getDataPayment()

    }

    componentDidUpdate(prevProps, prevStaete, snapshot) {
        const { listPayment } = this.props
        if (prevProps.listPayment !== listPayment)
            this.setState({ listPaymentState: listPayment })
    }

    handleNavigate = (item) => {
        const { navigation, route } = this.props
        const action = route.params
        //truyền từ screen/Ship/index.js
        if (action === "CHOOSE_CART")
            navigation.navigate("Choose Card", item.id)
        else
            navigation.navigate("View Card", item.id)
    }

    render() {
        const { navigation, route } = this.props
        const { listPaymentState } = this.state

        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />

                <FlatList
                    data={listPaymentState}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={obj => obj.title}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => this.handleNavigate(item)}
                        >
                            <Image
                                source={item.image}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.emptyTitle}>System is updating!</Text>}
                />
            </SafeAreaView>
        )
    }
}


const mapStateToProps = state => {
    return {
        listPayment: state.app.listPayment
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDataPayment: () => dispatch(actions.getDataPayment())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Payment)