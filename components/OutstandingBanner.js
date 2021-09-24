import React from 'react'
import {
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { styles } from '../Navigation/App/screens/Home/Sections/BannerStyles'

const IMAGE_URL = "https://images.complex.com/complex/images/c_crop,h_693,w_1200,x_0,y_44/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/sw0fvbftmcxz3twmxudx/lil-nas-x-mschf-air-max-97-satan-shoe"

function OutStandingBanner({ title, subTitle, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ImageBackground
                source={{ uri: IMAGE_URL }}
                style={styles.imageBg}
                imageStyle={{ borderRadius: 5 }}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default OutStandingBanner
