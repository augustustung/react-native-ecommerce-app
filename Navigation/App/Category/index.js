import React, { Component } from 'react'
import {
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../../components/CustomHeader'
import { emptyTitle, headerLeft } from '../../../ultis/CommonUlti'
import SafeAreaView from '../../../components/SafeAreaView'
import _ from 'lodash'
import * as actions from '../../../redux/actions'
import { styles } from './CategoryStyles'
import { ColorConst } from '../../../ultis/constant'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listCategory: [],
            selectedCategory: null
        }
    }

    async componentDidMount() {
        const { allCategory } = this.props
        if (allCategory && !_.isEmpty(allCategory)) {
            this.setState({
                listCategory: [...allCategory.man, ...allCategory.woman]
            })
        } else {
            await this.props.getAllCategory()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { allCategory } = this.props
        if (prevProps.allCategory !== allCategory)
            this.setState({
                listCategory: [...allCategory.man, ...allCategory.woman]
            })
    }

    getTextColor = (item) => {
        const { selectedCategory } = this.state
        if (selectedCategory && selectedCategory.title === item.title) {
            return ColorConst.PRIMARY_BLUE
        }
        return ColorConst.NEUTRAL_DARK
    }

    render() {
        const { navigation, route } = this.props
        const { listCategory } = this.state
        return (
            <SafeAreaView>
                <CustomHeader
                    headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                />

                <FlatList
                    data={listCategory}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={obj => obj.title}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => this.setState({ selectedCategory: item })}
                        >
                            <Image
                                source={item.image}
                                style={styles.itemImage}
                            />
                            <Text style={[
                                styles.itemName,
                                { color: this.getTextColor(item) }
                            ]}>{item.title}</Text>
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
        allCategory: state.user.allCategory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategory: () => dispatch(actions.getAllCategory())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Category)