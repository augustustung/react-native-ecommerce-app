
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native'
import SafeAreaView from '../../../components/SafeAreaView'
import StatusAction from '../../../components/StatusAction'
import ProductStar from '../../../components/ProductStar'
import { styles } from './SearchResultStyles'
import HeaderSearch from '../../../components/HeaderSearch'
import { fetchDataSearch } from '../../../services/userService'
import CustomModal from '../../../components/CustomModal'
import { ColorConst } from '../../../ultis/constant'
import { normalize } from '../../../ultis/Dimentions'

class SearchResult extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listSearchItem: [],
            textSearch: "",
            isSearching: false
        }
    }

    async componentDidMount() {
        const textSearch = this.props.route.params
        if (textSearch && textSearch.length > 0) {
            this.setState({ textSearch })
            let res = await fetchDataSearch(textSearch)
            if (res && res.errCode === 0)
                this.setState({ listSearchItem: res.data })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const textSearch = this.props.route.params
        if (prevProps.route.params !== textSearch) {
            let res = await fetchDataSearch(textSearch)
            if (res && res.length > 0)
                this.setState({ listSearchItem: res })
        }
    }

    setTextSearch = (textSearch) => {
        this.setState({ textSearch, isSearching: true })
    }

    searchItems = async (textSearch) => {
        let res = await fetchDataSearch(textSearch)
        if (res && res.errCode === 0)
            this.setState({ listSearchItem: res.data, isSearching: false })
        else
            this.setState({ listSearchItem: [], isSearching: false })
    }

    render() {
        const { navigation, route } = this.props
        const { listSearchItem, textSearch, isSearching } = this.state
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderSearch
                        navigation={navigation}
                        textSearch={textSearch}
                        setTextSearch={this.setTextSearch}
                        userInfo={this.props.userInfo}
                        uriLeft={require('../../../image/sort.png')}
                        uriRight={require('../../../image/filter.png')}
                        routeName={route.name}
                        searchItems={this.searchItems}
                    />
                    <View style={styles.resultHeader}>
                        <Text style={styles.numRe}>{listSearchItem.length} Result(s)</Text>
                        <View style={styles.options}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Category")}
                                style={{ flexDirection: 'row' }}
                            >
                                <Text style={[styles.numRe, { color: ColorConst.NEUTRAL_DARK }]}>Man Shoes</Text>
                                <Image
                                    source={require('../../../image/down.png')}
                                    style={styles.angleDown}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {listSearchItem.length > 0 ? <FlatList
                        data={listSearchItem}
                        keyExtractor={obj => obj.name}
                        numColumns={2}
                        style={{ marginLeft: normalize(16) }}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <ProductStar
                                item={item}
                                navigation={navigation}
                            />
                        )}
                    /> : (
                        <StatusAction
                            uri={require('../../../image/notFound.png')}
                            title="Product Not Found"
                            subtitle="thank you for shopping using lafyuu"
                            buttonTitle="Back To Home"
                            onPress={() => navigation.replace('App')}
                        />
                    )}
                    {
                        textSearch.length > 0 && isSearching &&
                        <CustomModal
                            textSearch={textSearch}
                            navigation={navigation}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}


export default SearchResult
