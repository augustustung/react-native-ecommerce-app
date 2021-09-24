import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../../components/CustomHeader'
import Reviewer from '../../../components/Reviewer'
import { styles } from './ReviewProductStyles'
import SafeAreaView from '../../../components/SafeAreaView'
import { headerLeft } from '../../../ultis/CommonUlti'
import PrimaryBlueButton from '../../../components/PrimaryBlueButton'

class ReviewProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listReview: [],
            currentIndex: 0
        }
    }

    getRouteName = () => {
        const listReviewProps = this.props.route.params
        let routeName = listReviewProps.length + " Review"
        routeName = listReviewProps > 1 ? routeName + "s" : routeName
        return routeName
    }

    componentDidMount() {
        this.filterListReview("All Review")
    }

    renderOptions = (item) => {
        const { currentIndex } = this.state
        if (item === "All Review")
            return (
                <TouchableOpacity style={styles.btnViewAll} onPress={() => this.filterListReview(item)}>
                    <Text style={styles.btnTitle}>{item}</Text>
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity
                    style={[styles.btnStar, { borderColor: currentIndex === item ? "#40BFFF" : '#EBF0FF' }]}
                    onPress={() => this.filterListReview(item)}
                >
                    <Image
                        source={require('../../../image/star.png')}
                        style={styles.starIcon}
                    />
                    <Text style={styles.btnStarTitle}>{item}</Text>
                </TouchableOpacity>
            )
    }

    filterListReview = (type) => {
        const listReviewProps = this.props.route.params
        let arr = []
        if (type === "All Review")
            arr = listReviewProps
        else
            arr = listReviewProps.filter((item) => +item.star === type)

        this.setState({ listReview: arr, currentIndex: type })
    }

    render() {
        const listOptions = ["All Review", 1, 2, 3, 4, 5]
        const { listReview } = this.state
        const { navigation } = this.props

        return (
            <SafeAreaView>
                <ScrollView>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: this.getRouteName() })}
                    />
                    <FlatList
                        horizontal={true}
                        data={listOptions}
                        keyExtractor={(obj) => Math.random()}
                        style={{ marginBottom: 20, marginTop: 16, marginLeft: 16 }}
                        renderItem={({ item }) => this.renderOptions(item)}
                        showsHorizontalScrollIndicator={false}
                    />

                    <FlatList
                        data={listReview}
                        keyExtractor={(obj) => Math.random()}
                        style={{ marginBottom: 30, marginHorizontal: 16 }}
                        renderItem={({ item }) => <Reviewer userComment={item} />}
                        ListEmptyComponent={<Text style={styles.emptyTitle}>No rate for this case!</Text>}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />

                </ScrollView>
                <PrimaryBlueButton
                    title="Write Review"
                    onPress={() => navigation.navigate("Write Review")}
                    marginBottom={16}
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReviewProduct)