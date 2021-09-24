import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import { calculateStarOnePerson } from '../ultis/CommonUlti'
import { styles } from '../Navigation/App/DetailProduct/DetailProductStyles'

const Reviewer = ({ userComment }) => {
    let arrStar = calculateStarOnePerson(userComment.star)
    return (
        <View style={styles.reviewer}>
            <View style={styles.info}>
                <Image source={{ uri: userComment.avatar }} style={styles.avatar} />

                <View>
                    <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>
                        {userComment.firstName} {userComment.lastName}
                    </Text>
                    <View style={styles.rate}>
                        {
                            arrStar.map((item, index) => (
                                <Image
                                    key={index + Math.random()}
                                    source={
                                        +item === 1 ?
                                            require('../image/star.png') :
                                            require('../image/unstar.png')
                                    }
                                    style={styles.starIcon}
                                />)

                            )
                        }
                    </View>
                </View>
            </View>

            <Text style={styles.description}>
                {userComment.content}
            </Text>

            <View style={styles.listImage}>
                {userComment.image && userComment.image.length > 0 && userComment.image.map((link, index) => (
                    <Image key={index} source={{ uri: link }} style={styles.image} />

                ))}
            </View>

            <Text style={styles.timeComment}>
                {userComment.time}
            </Text>

        </View>
    )
}

export default Reviewer
