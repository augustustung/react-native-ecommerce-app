import React, { Component } from 'react'
import {
    View,
    FlatList,
    Text
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from './sectionStyles'
import _ from 'lodash'
import ButtonTag from '../../../../../components/ButtonTag'
import ProductWithoutStar from '../../../../../components/ProductWithoutStar'
import { emptyTitle } from '../../../../../ultis/CommonUlti'

class MegaSale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listMegaSale: []
        }
    }

    componentDidMount() {
        const { homeData } = this.props
        if (homeData && homeData.megaSale && homeData.megaSale.length > 0) {
            this.setState({ listMegaSale: homeData.megaSale })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { megaSale } = this.props.homeData
        if (prevProps.homeData.megaSale !== megaSale) {
            this.setState({ listMegaSale: megaSale })
        }
    }

    render() {
        const { listMegaSale } = this.state
        return (
            <View style={[styles.sectionContainer, { marginTop: 18 }]}>
                <ButtonTag
                    title="Mega Sale"
                    btnTitle="See More"
                    OnPress={() => { }}
                />

                <View style={styles.sectionFooter}>
                    <FlatList
                        horizontal={true}
                        data={listMegaSale}
                        keyExtractor={(obj) => Math.random() * 3}
                        renderItem={({ item }) => <ProductWithoutStar item={item} navigation={this.props.navigation} />}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={emptyTitle()}
                    />
                </View>
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        homeData: state.user.homeData
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MegaSale)