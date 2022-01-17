import React from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { styles } from './BannerStyles'

const IMAGE_URL = "https://images.complex.com/complex/images/c_crop,h_693,w_1200,x_0,y_44/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/sw0fvbftmcxz3twmxudx/lil-nas-x-mschf-air-max-97-satan-shoe"

function Banner({
    onPress
}) {
    return (
        <TouchableOpacity style={[styles.container, { marginBottom: 0 }]} onPress={onPress}>
            <ImageBackground
                source={{ uri: IMAGE_URL }}
                style={styles.imageBg}
                imageStyle={{ borderRadius: 5 }}
            >
                <Text style={styles.title}>Super Flash Sale 50% OFF</Text>

                <View style={styles.timeCount}>
                    <View style={styles.square}>
                        <Text style={styles.timeContent}>08</Text>
                    </View>
                    <Text style={styles.divide}> : </Text>
                    <View style={styles.square}>
                        <Text style={styles.timeContent}>34</Text>
                    </View>
                    <Text style={styles.divide}> : </Text>
                    <View style={styles.square}>
                        <Text style={styles.timeContent}>52</Text>
                    </View>

                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default Banner
