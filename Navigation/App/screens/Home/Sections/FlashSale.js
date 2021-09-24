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
import ProductWithoutStar from '../../../../../components/ProductWithoutStar'
import { emptyTitle } from '../../../../../ultis/CommonUlti'

class FlashSale extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listFlashSale: []
        }
    }

    componentDidMount() {
        const { homeData } = this.props
        if (homeData && homeData.flashSale && homeData.flashSale.length > 0) {
            this.setState({ listFlashSale: homeData.flashSale })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { flashSale } = this.props.homeData
        if (prevProps.homeData.flashSale !== flashSale) {
            this.setState({ listFlashSale: flashSale })
        }
    }

    render() {
        const { listFlashSale } = this.state
        return (
            <View style={{ marginHorizontal: 16 }}>
                <ButtonTag
                    title="Flash Sale"
                    btnTitle="See More"
                    OnPress={() => { }}
                />

                <View style={styles.sectionFooter}>
                    <FlatList
                        horizontal={true}
                        data={listFlashSale}
                        keyExtractor={(obj) => Math.random() * 2}
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


export default connect(mapStateToProps, mapDispatchToProps)(FlashSale)