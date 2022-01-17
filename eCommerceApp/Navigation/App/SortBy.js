import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../ultis/CommonUlti'
import SafeAreaView from '../../components/SafeAreaView'
import _ from 'lodash'
import { styles } from './Category/CategoryStyles'
import { ColorConst, USER_ACTION_INTERFACE } from '../../ultis/constant'
import { getAllcodeType } from '../../services/userService'
import { connect } from 'react-redux'
import { actionTypes } from '../../redux/actions/actionsTypes'

class SortBy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listSort: [],
            selectedSortBy: null
        }
    }

    async componentDidMount() {
        this.props.processAction()
        const res = await getAllcodeType(USER_ACTION_INTERFACE.SORT)
        if (res && res.errCode === 0)
            this.setState({ listSort: res.data })

        this.props.processDone()
    }

    getTextColor = (item) => {
        const { selectedSortBy } = this.state
        if (selectedSortBy && selectedSortBy.value === item.value) {
            return ColorConst.PRIMARY_BLUE
        }
        return ColorConst.NEUTRAL_DARK
    }

    render() {
        const { navigation, route } = this.props
        const { listSort } = this.state
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />

                <FlatList
                    data={listSort}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={obj => obj.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => this.setState({ selectedSortBy: item })}
                        >
                            <Text style={[
                                styles.itemName,
                                { color: this.getTextColor(item) }
                            ]}>{item.value}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={emptyTitle()}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processAction: () => dispatch({ type: actionTypes.PROCESS_ACTION }),
        processDone: () => dispatch({ type: actionTypes.PROCESS_ACTION_FAILED })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SortBy)