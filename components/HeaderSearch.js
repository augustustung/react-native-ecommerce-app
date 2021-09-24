import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Animated
} from 'react-native'
import CustomHeader from './CustomHeader'
import { normalize } from '../ultis/Dimentions'
import { styles } from '../Navigation/App/screens/Home/HomeScreen/HomeScreenStyle'
import { ColorConst } from '../ultis/constant'
import { connect } from 'react-redux'

class HeaderSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            headerLeftWidth: new Animated.Value(0),
            headerRightChange: false,
            borderColor: ColorConst.NEUTRAL_LIGHT
        }
    }

    increasingWidth() {
        const { headerLeftWidth, headerRightChange } = this.state
        if (!headerRightChange) {
            Animated.timing(headerLeftWidth, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();

            this.setState({ headerRightChange: !headerRightChange })
        }

    }

    decreasingWidth(focus) {
        const { headerLeftWidth, headerRightChange } = this.state
        if (this.props.textSearch.length === 0 || focus) {
            Animated.timing(headerLeftWidth, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
            this.setState({ headerRightChange: !headerRightChange })
        }
    }

    onChange = (color) => {
        color === ColorConst.NEUTRAL_LIGHT ? this.decreasingWidth() : this.increasingWidth()
        this.setState({ borderColor: color })
    }

    onHandleNavigateOrSearch = async () => {
        const {
            routeName,
            textSearch,
            navigation,
            searchItems
        } = this.props
        if (routeName && routeName === "Search Result") {
            await searchItems(textSearch)
        } else {
            navigation.navigate("Search Result", textSearch)
        }
    }

    headerLeft = () => {
        const { borderColor, headerLeftWidth, headerRightChange } = this.state
        const { textSearch, setTextSearch } = this.props
        const width = headerLeftWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [normalize(263), normalize(291)]
        })
        return (
            <Animated.View style={[styles.searchContainer,
            {
                borderColor: borderColor,
                width: width,
            }]}

            >
                <Image
                    source={require('../image/Tab/SearchFocus.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    autoCorrect={false}
                    value={textSearch}
                    onChangeText={(text) => setTextSearch(text)}
                    onBlur={() => this.onChange(ColorConst.NEUTRAL_LIGHT)}
                    onFocus={() => this.onChange(ColorConst.PRIMARY_BLUE)}
                    onSubmitEditing={this.onHandleNavigateOrSearch}
                    placeholder="Search Product"
                    numberOfLines={1}
                    style={[styles.searchInput, {
                        width: headerRightChange ? '75%' : '78%'
                    }]}
                />
                {
                    headerRightChange &&
                    <TouchableOpacity
                        style={{ position: 'absolute', right: normalize(16) }}
                        onPress={() => {
                            setTextSearch('')
                            this.setState({ headerRightChange: false })
                            this.decreasingWidth("FOCUS")
                        }}
                    >
                        <Image
                            style={styles.image}
                            source={require('../image/clear.png')}
                        />
                    </TouchableOpacity>
                }
            </Animated.View>)
    }

    headerRight = () => {
        const { navigation, uriLeft, uriRight } = this.props
        const { headerRightChange } = this.state
        const { offer, feed, activity } = this.props.userInfo.notification

        const width = !headerRightChange
            ? normalize(24 + 24 + 16 + 16)
            : normalize(24 + 16 + 16)

        return (
            <View style={[
                styles.headerRight, { width: width }
            ]}
            >
                {
                    !headerRightChange && (
                        <TouchableOpacity
                            style={{ marginLeft: normalize(16) }}
                            onPress={
                                uriLeft
                                    ? () => navigation.navigate("Sort By")
                                    : () => navigation.navigate("Favorite Product")
                            }
                        >
                            <Image
                                style={styles.image}
                                source={uriLeft ? uriLeft : require('../image/wishlist.png')}
                            />
                        </TouchableOpacity>
                    )
                }
                {
                    !headerRightChange ? (
                        <TouchableOpacity
                            style={{ marginLeft: normalize(16), position: 'relative' }}
                            onPress={
                                uriRight
                                    ? () => navigation.navigate("Filter Search")
                                    : () => navigation.navigate("Notification")
                            }
                        >
                            <Image
                                style={styles.image}
                                source={uriRight ? uriRight : require('../image/notification.png')}
                            />
                            {
                                (offer.length > 0 || feed.length > 0 || activity.length > 0) && <View style={styles.notification} />
                            }
                        </TouchableOpacity>) : (
                        <TouchableOpacity
                            onPress={() => { }}
                        >
                            <Image
                                style={styles.image}
                                source={require('../image/Mic.png')}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }

    render() {
        return (
            <CustomHeader
                headerLeft={this.headerLeft}
                headerRight={this.headerRight}
            />
        )
    }
}


const mapStateToProps = state => {
    return {
        userInfo: state.app.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch)
