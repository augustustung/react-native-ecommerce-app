import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import SafeAreaView from '../../../../../components/SafeAreaView'
import CustomeHeader from '../../../../../components/CustomHeader'
import { styles } from './OfferScreenStyles'
import Banner from '../../Home/Sections/Banner'
import OutStandingBanner from '../../../../../components/OutstandingBanner'

const OfferScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CustomeHeader
                    headerLeft={() =>
                        <View style={styles.headerWrapper}>
                            <Text style={styles.headerTitle}>Offer</Text>
                        </View>
                    }
                />

                <View style={styles.outstanding}>
                    <Text style={styles.outstandingTitle}>Use “MEGSL” Cupon For Get 90%off</Text>
                </View>

                <Banner
                    onPress={() => navigation.navigate("Super Flash Sale")}
                    navigation={navigation}
                />

                <OutStandingBanner
                    title="90% Off Super Mega Sale"
                    subTitle="Special birthday Lafyuu"
                    onPress={() => { }}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default OfferScreen
