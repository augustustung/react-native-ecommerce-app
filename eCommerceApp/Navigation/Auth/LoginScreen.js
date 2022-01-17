import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import { styles } from './AuthStyle'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { SRC } from '../../ultis/src'
import { AUTHENTICATE } from '../../ultis/constant'
import FormInput from '../../components/FormInput'
import PrimaryBlueButton from '../../components/PrimaryBlueButton'
import SocialButton from '../../components/SocialButton'
import { authenticate } from '../../services/userService'
import { ColorConst } from '../../ultis/constant'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            err: null,
            borderEmailColor: ColorConst.NEUTRAL_LIGHT,
            borderPasswordColor: ColorConst.NEUTRAL_LIGHT,
            emailIcon: SRC.EMAIL,
            passwordIcon: SRC.PASSWROD
        }
    }

    _onValidateInput = () => {
        const { email, password } = this.state

        if (!email || !password) {
            this.setState({
                borderEmailColor: ColorConst.PRIMARY_RED,
                emailIcon: SRC.EMAIL_WRONG,
                passwordIcon: SRC.PASSWROD_WRONG,
                borderPasswordColor: ColorConst.PRIMARY_RED,
                err: "Please fill in email and password"
            })
            return false
        }
        let re = AUTHENTICATE.E_EXPRESSION.test(String(email).toLowerCase()) === false
        if (re) {
            this.setState({
                borderEmailColor: ColorConst.PRIMARY_RED,
                emailIcon: SRC.EMAIL_WRONG,
                err: "Email is not valid. Please try again!"
            })
            return false
        }

        return true
    }

    _onSignIn = async () => {
        this.setState({
            err: null,
            borderEmailColor: ColorConst.NEUTRAL_LIGHT,
            borderPasswordColor: ColorConst.NEUTRAL_LIGHT,
            emailIcon: SRC.EMAIL,
            passwordIcon: SRC.PASSWROD
        })

        let valid = await this._onValidateInput()
        if (!valid)
            return
        else {
            const { email, password } = this.state
            this.props.loadingAction()
            let res = await authenticate({
                email: email,
                password: password
            })
            if (res && res.errCode === 0)
                this.props.handleLogin(
                    res.user,
                    res.accessToken,
                    res.refreshToken
                )
            else
                this.setState({ err: res.errMessage })
        }
    }

    onHoverInputEmail = (type) => {
        if (type === 'focus') {
            this.setState({
                borderEmailColor: "#40BFFF",
                emailIcon: SRC.EMAIL_FOCUS
            })
        } else {
            this.setState({
                borderEmailColor: ColorConst.NEUTRAL_LIGHT,
                emailIcon: SRC.EMAIL
            })
        }
    }

    onHoverInputPassword = (type) => {
        if (type === 'focus') {
            this.setState({
                borderPasswordColor: "#40BFFF",
                passwordIcon: SRC.PASSWROD_FOCUS
            })
        } else {
            this.setState({
                borderPasswordColor: ColorConst.NEUTRAL_LIGHT,
                passwordIcon: SRC.PASSWROD,
            })
        }
    }

    render() {
        const {
            email,
            password,
            err,
            borderEmailColor,
            borderPasswordColor,
            emailIcon,
            passwordIcon
        } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <Image
                        source={require('../../image/Icon.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Welcome to Lafyuu</Text>

                    <Text style={styles.subTitle}>Sign in to continue</Text>


                    <FormInput
                        value={email}
                        setValue={userEmail => this.setState({ email: userEmail })}
                        uri={emailIcon}
                        borderColor={borderEmailColor}
                        left
                        placeholder="Your email"
                        onFocus={() => this.onHoverInputEmail('focus')}
                        onBlur={() => this.onHoverInputEmail('unfocus')}
                        autoCapitalize="none"
                        marginBottom={8}
                        keyBoardType="email-address"
                    />


                    <FormInput
                        value={password}
                        setValue={userPassword => this.setState({ password: userPassword })}
                        uri={passwordIcon}
                        borderColor={borderPasswordColor}
                        placeholder="Password"
                        onFocus={() => this.onHoverInputPassword('focus')}
                        onBlur={() => this.onHoverInputPassword('unfocus')}
                        autoCapitalize="none"
                        marginBottom={8}
                        secureTextEntry={true}
                        left
                    />

                    {err && <Text style={styles.err}>{err}</Text>}

                    <View style={styles.btn}>
                        <PrimaryBlueButton
                            title="Sign In"
                            onPress={this._onSignIn}
                        />
                    </View>

                    <View style={styles.options}>
                        <View style={styles.lineLeft}></View>
                        <Text style={styles.otherTitle}>OR</Text>
                        <View style={styles.lineRight}></View>
                    </View>


                    <SocialButton
                        title="Login with Google"
                        onPress={() => Alert.alert("Login with Google")}
                        source={require('../../image/google-btn.png')}
                        marginBottom={8}
                    />

                    <SocialButton
                        title="Login with Facebook"
                        onPress={() => Alert.alert("Login with Facebook")}
                        source={require('../../image/fb-btn.png')}
                    />

                    <TouchableOpacity style={styles.forgotButton} onPress={() => Alert.alert("Forgot password")}>
                        <Text style={styles.forgotButtonText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.navButtonText}>Don't have an account? <Text style={styles.btnRegister}> Register</Text></Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        )
    }
}


const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (userInfo, accessToken, refreshToken) => dispatch(actions.ProcessLogin(userInfo, accessToken, refreshToken)),
        loadingAction: () => dispatch(actions.ProcessLogin())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)