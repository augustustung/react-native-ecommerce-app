import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard
} from 'react-native'
import { styles } from './AuthStyle'
import { AUTHENTICATE } from '../../ultis/constant'
import PrimaryBlueButton from '../../components/PrimaryBlueButton'
import { SRC } from '../../ultis/src'
import FormInput from '../../components/FormInput'
import * as actions from '../../redux/actions'
import { register } from '../../services/userService'
import Toast from 'react-native-toast-message'
import { connect } from 'react-redux'
import { ColorConst } from '../../ultis/constant'

class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            err: null,
            borderEmailColor: ColorConst.NEUTRAL_LIGHT,
            borderPasswordColor: ColorConst.NEUTRAL_LIGHT,
            borderConfirmPasswordColor: ColorConst.NEUTRAL_LIGHT,
            borderNameColor: ColorConst.NEUTRAL_LIGHT,

            emailIcon: SRC.EMAIL,
            passwordIcon: SRC.PASSWROD,
            nameIcon: SRC.USER,
            confirmPasswordIcon: SRC.PASSWROD
        }
    }

    validateInput = () => {
        const { email, password, confirmPassword, fullName } = this.state

        if (!email || !fullName || !password || !confirmPassword) {
            this.setState({
                borderEmailColor: ColorConst.PRIMARY_RED,
                borderPasswordColor: ColorConst.PRIMARY_RED,
                borderConfirmPasswordColor: ColorConst.PRIMARY_RED,
                borderNameColor: ColorConst.PRIMARY_RED,

                emailIcon: SRC.EMAIL_WRONG,
                passwordIcon: SRC.PASSWROD_WRONG,
                confirmPasswordIcon: SRC.PASSWROD_WRONG,
                nameIcon: SRC.USER_WRONG,
                err: "Please fill in all input!"
            })

            return false
        }
        let re = AUTHENTICATE.E_EXPRESSION.test(String(email).toLowerCase()) === false
        if (re) {
            this.setState({
                borderEmailColor: ColorConst.PRIMARY_RED,
                emailIcon: SRC.EMAIL_WRONG,
                err: "Email is not valid"
            })
            return false
        }
        if (password !== confirmPassword) {
            this.setState({
                borderPasswordColor: ColorConst.PRIMARY_RED,
                borderConfirmPasswordColor: ColorConst.PRIMARY_RED,
                borderPasswordIcon: ColorConst.PRIMARY_RED,
                passwordIcon: SRC.PASSWROD_WRONG,
                confirmPasswordIcon: SRC.PASSWROD_WRONG,
                err: "Passwords don't match"
            })
            return false
        }
        return true
    }

    _onSignUp = async () => {
        this.setState({
            err: null,
            borderEmailColor: ColorConst.NEUTRAL_LIGHT,
            borderPasswordColor: ColorConst.NEUTRAL_LIGHT,
            borderNameColor: ColorConst.NEUTRAL_LIGHT,
            borderConfirmPasswordColor: ColorConst.NEUTRAL_LIGHT,

            emailIcon: SRC.EMAIL,
            passwordIcon: SRC.PASSWROD,
            confirmPasswordIcon: SRC.PASSWROD,
            nameIcon: SRC.USER,
        })
        let valid = this.validateInput()
        if (valid) {
            const { fullName, email, password } = this.state
            this.props.loadingAction()
            const res = await register({
                fullName: fullName,
                email: email,
                password: password
            })
            if (res && res.errCode === 0) {
                this.props.navigation.goBack();
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successful',
                    text2: "Register succeed. Let's sign in now",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40
                });
            } else
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: res.errMessage,
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40
                });
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
                passwordIcon: SRC.PASSWROD
            })
        }
    }

    onHoverInputConfirmPassword = (type) => {
        if (type === 'focus') {
            this.setState({
                borderConfirmPasswordColor: "#40BFFF",
                confirmPasswordIcon: SRC.PASSWROD_FOCUS
            })
        } else {
            this.setState({
                borderConfirmPasswordColor: ColorConst.NEUTRAL_LIGHT,
                confirmPasswordIcon: SRC.PASSWROD
            })
        }
    }

    onHoverInputName = (type) => {
        if (type === 'focus') {
            this.setState({
                borderNameColor: "#40BFFF",
                nameIcon: SRC.USER_FOCUS
            })
        } else {
            this.setState({
                borderNameColor: ColorConst.NEUTRAL_LIGHT,
                nameIcon: SRC.USER
            })
        }
    }

    render() {
        const {
            email,
            password,
            err,
            fullName,
            confirmPassword,
            borderEmailColor,
            borderPasswordColor,
            borderNameColor,
            borderConfirmPasswordColor,
            emailIcon,
            passwordIcon,
            confirmPasswordIcon,
            nameIcon
        } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <Image
                        source={require('../../image/Icon.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>Let’s Get Started</Text>

                    <Text style={styles.subTitle}>Create an new account</Text>

                    <FormInput
                        value={fullName}
                        setValue={name => this.setState({ fullName: name })}
                        uri={nameIcon}
                        borderColor={borderNameColor}
                        placeholder="Full Name"
                        onFocus={() => this.onHoverInputName('focus')}
                        onBlur={() => this.onHoverInputName('unfocus')}
                        autoCapitalize="none"
                        marginBottom={8}
                        left
                        keyBoardType="email-address"
                    />

                    <FormInput
                        value={email}
                        setValue={userEmail => this.setState({ email: userEmail })}
                        uri={emailIcon}
                        borderColor={borderEmailColor}
                        placeholder="Your email"
                        onFocus={() => this.onHoverInputEmail('focus')}
                        onBlur={() => this.onHoverInputEmail('unfocus')}
                        autoCapitalize="none"
                        marginBottom={8}
                        left
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


                    <FormInput
                        value={confirmPassword}
                        setValue={userPassword => this.setState({ confirmPassword: userPassword })}
                        uri={confirmPasswordIcon}
                        borderColor={borderConfirmPasswordColor}
                        placeholder="Password Again"
                        onFocus={() => this.onHoverInputConfirmPassword('focus')}
                        onBlur={() => this.onHoverInputConfirmPassword('unfocus')}
                        autoCapitalize="none"
                        marginBottom={8}
                        secureTextEntry={true}
                        left
                    />

                    {err && <Text style={styles.err}>{err}</Text>}

                    <View style={styles.btn}>
                        <PrimaryBlueButton
                            title="Sign Up"
                            onPress={this._onSignUp}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.navButtonText}>have an account? <Text style={styles.btnRegister}> Sign In</Text></Text>
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
        handleLogin: (userInfo) => dispatch(actions.ProcessLogin(userInfo)),
        loadingAction: () => dispatch(actions.ProcessLogin())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);