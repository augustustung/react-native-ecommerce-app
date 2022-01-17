import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../../../redux/actions'
import SafeAreaView from '../../../../../components/SafeAreaView'
import _ from 'lodash'
import SingleCategory from '../../../../../components/SingleCategory'
import { styling } from './ExploreScreenStyles'
import CustomModal from '../../../../../components/CustomModal'
import HeaderSearch from '../../../../../components/HeaderSearch'
import { SCREEN_WIDTH } from '../../../../../ultis/Dimentions'

class ExploreScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listCateory: {},
            borderColor: "#EBF0FF",
            textSearch: '',
            isSearching: true
        }
    }

    async componentDidMount() {
        const { allCategory, getAllCategory } = this.props
        if (allCategory && !_.isEmpty(allCategory))
            this.setState({ listCateory: allCategory })
        else
            await getAllCategory()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allCategory } = this.props
        if (prevProps.allCategory !== allCategory)
            this.setState({
                listCateory: allCategory
            })
    }

    setTextSearch = (textSearch) => {
        this.setState({ textSearch })
    }

    render() {
        const { listCateory, textSearch } = this.state
        const { navigation, userInfo } = this.props
        return (
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <HeaderSearch
                        navigation={navigation}
                        userInfo={userInfo}
                        textSearch={textSearch}
                        setTextSearch={this.setTextSearch.bind(this)}
                    />

                    <Text style={styling.title}>Man Fashion</Text>
                    {!_.isEmpty(listCateory) && <FlatList
                        data={listCateory.man}
                        horizontal={false}
                        renderItem={({ item }) => <SingleCategory item={item} marginRight={SCREEN_WIDTH * 0.052} />}
                        numColumns={4}
                        style={styling.containerCategory}
                    />}

                    <Text style={[styling.title, { marginTop: 0 }]}>Woman Fashion</Text>
                    {
                        !_.isEmpty(listCateory) && <FlatList
                            data={listCateory.woman}
                            horizontal={false}
                            renderItem={({ item }) => <SingleCategory item={item} marginRight={SCREEN_WIDTH * 0.056} />}
                            numColumns={4}
                            style={styling.containerCategory} />
                    }
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
        allCategory: state.user.allCategory,
        userInfo: state.app.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategory: () => dispatch(actions.getAllCategory())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)