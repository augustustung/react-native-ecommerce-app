import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import AppNavigation from './App';
import AuthNavigation from './Auth';
import { connect } from 'react-redux';

class ECommerceApp extends Component {
    render() {
        const { userInfo } = this.props
        return (
            <NavigationContainer>
                {userInfo ? <AppNavigation /> : <AuthNavigation />}
            </NavigationContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ECommerceApp)