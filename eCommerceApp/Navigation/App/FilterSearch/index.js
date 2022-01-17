import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../../ultis/CommonUlti'
import SafeAreaView from '../../../components/SafeAreaView'
import _ from 'lodash'
import * as DUMMYDATA from '../../../ultis/data.json'
import { styles } from './FilterSearchStyles'
import CustomSlider from '../../../components/CustomSlider'
import { ColorConst, USER_ACTION_INTERFACE } from '../../../ultis/constant'
import { connect } from 'react-redux'
import { getAllcodeType } from '../../../services/userService'
import { actionTypes } from '../../../redux/actions/actionsTypes'

class FilterSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listFilter: [
                [...DUMMYDATA.Allcode.Condition],
                [...DUMMYDATA.Allcode.BUYING_FORMAT],
                [...DUMMYDATA.Allcode.ITEM_LOCATION],
                [...DUMMYDATA.Allcode.SHOW_ONLY]
            ],
            selectedCondition: [],
            selectedBuyingFormat: [],
            selectedItemLocation: [],
            selectedShowOnly: []
        }
    }

    async componentDidMount() {
        this.props.processAction()
        const resCondition = await getAllcodeType(USER_ACTION_INTERFACE.Condition)
        const resBuyingFormat = await getAllcodeType(USER_ACTION_INTERFACE.BUYING_FORMAT)
        const resItemLocation = await getAllcodeType(USER_ACTION_INTERFACE.ITEM_LOCATION)
        const resShowOnly = await getAllcodeType(USER_ACTION_INTERFACE.SHOW_ONLY)

        if (
            resCondition && resCondition.errCode === 0
            && resBuyingFormat && resBuyingFormat.errCode === 0
            && resItemLocation && resItemLocation.errCode === 0
            && resShowOnly && resShowOnly.errCode === 0
        )
            this.setState({
                listFilter: [
                    [...resCondition.data],
                    [...resBuyingFormat.data],
                    [...resItemLocation.data],
                    [...resShowOnly.data]
                ]
            })

        this.props.processDone()
    }

    renderSelectedItem = (index) => {
        const { selectedCondition, selectedBuyingFormat, selectedItemLocation, selectedShowOnly } = this.state
        let cpState
        if (index === 0)
            cpState = selectedCondition
        else if (index === 1)
            cpState = selectedBuyingFormat
        else if (index === 2)
            cpState = selectedItemLocation
        else if (index === 3)
            cpState = selectedShowOnly

        return cpState
    }

    _onHandleSelectItem = (itemInput, index) => {
        const cpState = this.renderSelectedItem(index)
        let i = cpState.findIndex(item => item._id === itemInput._id)
        if (i === -1) {
            cpState.push(itemInput)
        } else {
            cpState.splice(i, 1)
        }

        switch (index) {
            case 0:
                this.setState({ selectedCondition: cpState })
                break
            case 1:
                this.setState({ selectedBuyingFormat: cpState })
                break
            case 2:
                this.setState({ selectedItemLocation: cpState })
                break
            case 3:
                this.setState({ selectedShowOnly: cpState })
                break
            default:
                break
        }
    }


    render() {
        const { navigation, route } = this.props
        const {
            listFilter,
            selectedBuyingFormat,
            selectedCondition,
            selectedItemLocation,
            selectedShowOnly
        } = this.state
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                    />
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Price Range</Text>
                        <CustomSlider />
                    </View>


                    <Sections
                        listItem={listFilter[0]}
                        selectedItem={selectedCondition}
                        handleSelectItem={this._onHandleSelectItem}
                        index={0}
                        title="Condition"
                    />


                    <Sections
                        listItem={listFilter[1]}
                        selectedItem={selectedBuyingFormat}
                        handleSelectItem={this._onHandleSelectItem}
                        index={1}
                        title="Buying Format"
                    />

                    <Sections
                        listItem={listFilter[2]}
                        selectedItem={selectedItemLocation}
                        handleSelectItem={this._onHandleSelectItem}
                        index={2}
                        title="Item Location"
                    />

                    <Sections
                        listItem={listFilter[3]}
                        selectedItem={selectedShowOnly}
                        handleSelectItem={this._onHandleSelectItem}
                        index={3}
                        title="Show only"
                    />

                </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(FilterSearch)

const Sections = ({
    listItem,
    selectedItem,
    handleSelectItem,
    index,
    title
}) => {
    const getBorderColor = (itemInput) => {
        let findItem = selectedItem.find(item => item.keyMap === itemInput.keyMap)
        if (findItem) {
            return ColorConst.PRIMARY_BLUE_OPACITY
        }
        return ColorConst.NEUTRAL_LIGHT
    }

    const getBgColor = (itemInput) => {
        let findItem = selectedItem.find(item => item.keyMap === itemInput.keyMap)
        if (findItem) {
            return ColorConst.PRIMARY_BLUE_OPACITY
        }
        return "transparent"
    }

    const getTextColor = (itemInput) => {
        let findItem = selectedItem.find(item => item.keyMap === itemInput.keyMap)
        if (findItem) {
            return ColorConst.PRIMARY_BLUE
        }
        return ColorConst.NEUTRAL_DARK
    }

    const getFontWeight = (itemInput) => {
        let findItem = selectedItem.find(item => item.keyMap === itemInput.keyMap)
        if (findItem) {
            return "700"
        }
        return "400"
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <FlatList
                data={listItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={obj => (Math.random() * 3).toString()}
                numColumns={index === 3 ? 2 : 3}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleSelectItem(item, index)}
                        style={[styles.item, {
                            borderColor: getBorderColor(item),
                            backgroundColor: getBgColor(item)
                        }]}
                    >
                        <Text style={[
                            styles.itemTitle,
                            {
                                color: getTextColor(item),
                                fontWeight: getFontWeight(item)
                            }
                        ]}>{item.value}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={emptyTitle()}
            />
        </View>
    )
}