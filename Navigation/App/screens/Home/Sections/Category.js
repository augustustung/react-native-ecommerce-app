import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './sectionStyles'
import _ from 'lodash'
import ButtonTag from '../../../../../components/ButtonTag'
import * as actions from '../../../../../redux/actions'
import SingleCategory from '../../../../../components/SingleCategory'
import { emptyTitle } from '../../../../../ultis/CommonUlti'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listCategory: []
        }
    }

    async componentDidMount() {
        await this.props.getHomeCategory()
        const { homeCategory } = this.props
        if (homeCategory && homeCategory.length > 0)
            this.setState({ listCategory: homeCategory })
    }

    render() {
        const { listCategory } = this.state
        return (
            <View style={styles.sectionContainer}>
                <ButtonTag
                    title="Category"
                    btnTitle="More Category"
                    OnPress={() => { }}
                />

                <FlatList
                    horizontal={true}
                    data={listCategory}
                    keyExtractor={(obj) => Math.random()}
                    renderItem={({ item }) => <SingleCategory item={item} />}
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={emptyTitle()}
                />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        homeCategory: state.user.homeCategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getHomeCategory: () => dispatch(actions.getHomeCategory())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Category)