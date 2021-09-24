import React, { useState } from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import SafeAreaView from '../../../../../components/SafeAreaView'
import _ from 'lodash'
import PrimaryBlueButton from '../../../../../components/PrimaryBlueButton'
import FormInput from '../../../../../components/FormInput'
import CustomHeader from '../../../../../components/CustomHeader'
import { headerLeft } from '../../../../../ultis/CommonUlti'
import { styles } from './styles'
import Card from '../../../../../components/Card'
import Toast from 'react-native-toast-message'
import { normalize, normalizeV } from '../../../../../ultis/Dimentions'

const ConfirmCard = ({ navigation, route }) => {
    const infoCard = route.params


    const handleSaveCard = () => {
        //call api
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Successfully',
            text2: "Add card payment succeed!",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
        })

        navigation.goBack()
        navigation.goBack()
    }

    return (
        <SafeAreaView>
            <CustomHeader
                headerLeft={() =>
                    headerLeft({
                        navigation: navigation,
                        routeName: infoCard.cardHolder,
                        width: 0.515
                    })}
            />
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        marginHorizontal: normalize(16),
                        marginTop: normalizeV(16)
                    }}>
                    <Card item={infoCard} marginRight={normalize(20)} />
                </View>


                <View style={styles.singleInput}>
                    <FormInput
                        title="Card Number"
                        flexWidth
                        value={infoCard.cardNumber}
                        disable
                    />
                </View>

                <View style={styles.wrapper}>
                    <View style={[styles.inputWrapper, { marginRight: 13 }]}>
                        <FormInput
                            title="Expiration Date"
                            flexWidth
                            value={infoCard.expirationDate}
                            disable
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <FormInput
                            title="Security Code"
                            value={infoCard.securityCode}
                            disable
                            flexWidth
                        />
                    </View>



                </View>

                <View style={styles.singleInput}>
                    <FormInput
                        title="Card Holder"
                        value={infoCard.cardHolder}
                        disable
                    />
                </View>
            </View>
            <PrimaryBlueButton
                title="Save"
                onPress={() => handleSaveCard()}
                marginBottom={normalizeV(16)}
            />
        </SafeAreaView>
    )
}

export default ConfirmCard