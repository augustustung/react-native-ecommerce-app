import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard,
    StyleSheet,
    FlatList
} from 'react-native'
import { SCREEN_HEIGHT, SCREEN_WIDTH, normalize } from '../ultis/Dimentions';
import { fetchDataSearch } from '../services/userService'
import { ColorConst } from '../ultis/constant'

class CustomModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listSearchItem: []
        }
    }

    componentDidMount() {
        const { textSearch } = this.props
        if (textSearch)
            this._onSearchItem(textSearch)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { textSearch } = this.props
        if (prevProps.textSearch !== textSearch) {
            this._onSearchItem(textSearch)
        }
    }

    _onSearchItem = async (textSearch) => {
        let res = await fetchDataSearch(textSearch)
        if (res && res.errCode === 0)
            this.setState({ listSearchItem: res.data })
        else
            this.setState({ listSearchItem: [] })
    }

    render() {
        const { listSearchItem } = this.state
        const { navigation } = this.props

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <FlatList
                        data={listSearchItem}
                        keyExtractor={obj => obj.name}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigation.navigate("Detail Product", item.id)}
                            >
                                <Text numberOfLines={1} style={styles.itemTitle}>{item.name}</Text>
                            </TouchableOpacity>
                        )}

                        ListEmptyComponent={
                            <View style={styles.item}>
                                <Text style={[styles.itemTitle, { color: ColorConst.PRIMARY_BLUE }]}>Product Not Found</Text>
                            </View>
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default CustomModal

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#fff',
        zIndex: 3,
        marginTop: normalize(44 + 30),
        position: 'absolute'
    },
    item: {
        marginHorizontal: normalize(16)
    },
    itemTitle: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: '400',
        fontSize: normalize(12),
        overflow: 'hidden',
        lineHeight: normalize(21.6),
        paddingVertical: normalize(16)
    }
})