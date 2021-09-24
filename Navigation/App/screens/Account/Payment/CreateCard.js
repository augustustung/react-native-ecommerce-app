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
import { normalizeV } from '../../../../../ultis/Dimentions'

function ViewCard({ route, navigation }) {
    const [infoCard, setInfoCard] = useState({
        cardNumber: '',
        expirationDate: "", //expirationDate
        securityCode: '',
        cardHolder: ''
    })
    const [borderColor, setBorderColor] = useState({
        cardNumber: null,
        expirationDate: null,
        securityCode: null,
        cardHolder: null
    })
    const [err, setErr] = useState('')

    const setCardNumber = (text) => {
        if (text.length === 4 || text.length === 11 || text.length === 18)
            setInfoCard(prev => ({
                ...prev,
                cardNumber: text + " - "
            }))
        else if (text.length <= 25)
            setInfoCard(prev => ({
                ...prev,
                cardNumber: text
            }))
        else return
    }

    const validateInput = () => {
        const arrValid = ["cardNumber", "expirationDate", "securityCode", "cardHolder"]
        for (let i = 0; i < arrValid.length; i++) {
            if (!infoCard[arrValid[i]]) {
                setErr("Please fill in form")
                setBorderColor({
                    cardNumber: i >= 0 ? "#FB7181" : null,
                    expirationDate: i >= 1 ? "#FB7181" : null,
                    securityCode: i >= 2 ? "#FB7181" : null,
                    cardHolder: i >= 3 ? "#FB7181" : null
                })

                return false
            }
        }
        if (infoCard.securityCode !== "A") {
            setErr("Security Code Is Wrong ")
            setBorderColor(prev => ({
                ...prev, securityCode: "#FB7181",
            }))
            return false
        }
        if (infoCard.cardNumber.length !== 25) {
            setErr("Card Number is not valid")
            setBorderColor(prev => ({
                ...prev,
                cardNumber: "#FB7181"
            }))
        }
        return true
    }

    const handleAddCard = () => {
        setBorderColor({
            cardNumber: null,
            expirationDate: null,
            securityCode: null,
            cardHolder: null
        })
        setErr('')

        const valid = validateInput()
        if (!valid)
            return
        else {
            // call api

            navigation.navigate('Save Card', {
                ...infoCard,
                cardSave: "12/3"
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomHeader
                        headerLeft={() => headerLeft({ navigation: navigation, routeName: "Add Card" })}
                    />
                    {err.length > 0 && <View style={styles.error}>
                        <Image
                            source={require('../../../../../image/alertOutline.png')}
                            style={styles.alert}
                        />
                        <Text style={styles.errTitle}>{err}</Text>
                    </View>}

                    <View style={styles.singleInput}>
                        <FormInput
                            title="Card Number"
                            placeholder="Enter Card Number"
                            value={infoCard.cardNumber}
                            borderColor={borderColor.cardNumber}
                            keyboardType='numeric'
                            setValue={(val) => setCardNumber(val)}
                        />
                    </View>

                    <View style={styles.wrapper}>
                        <View style={[styles.inputWrapper, { marginRight: 13 }]}>
                            <FormInput
                                title="Expiration Date"
                                flexWidth
                                placeholder="Expiration Date"
                                value={infoCard.expirationDate}
                                borderColor={borderColor.expirationDate}
                                setValue={(val) => setInfoCard((prev) => ({
                                    ...prev,
                                    expirationDate: val
                                }))}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <FormInput
                                title="Security Code"
                                flexWidth
                                placeholder="Security Code"
                                value={infoCard.securityCode}
                                borderColor={borderColor.securityCode}
                                setValue={(val) => setInfoCard((prev) => ({
                                    ...prev,
                                    securityCode: val
                                }))}
                            />
                        </View>
                    </View>

                    <View style={styles.singleInput}>
                        <FormInput
                            title="Card Holder"
                            placeholder="Enter Card Holder"
                            value={infoCard.cardHolder}
                            borderColor={borderColor.cardHolder}
                            setValue={(val) => setInfoCard((prev) => ({
                                ...prev,
                                cardHolder: val
                            }))}
                        />
                    </View>

                </ScrollView>
                <PrimaryBlueButton
                    title="Add Card"
                    onPress={handleAddCard}
                    marginBottom={normalizeV(16)}
                />

            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


export default ViewCard