import React, { Component } from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text,
    Keyboard,
    FlatList,
    TextInput,
    Image,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import CustomHeader from '../../../components/CustomHeader'
import { headerLeft } from '../../../ultis/CommonUlti'
import SafeAreaView from '../../../components/SafeAreaView'
import { styles } from './WriteReviewStyles'
import PrimaryBlueButton from '../../../components/PrimaryBlueButton'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker'

class WriteReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrStar: [
                { isSlect: false, index: 1 },
                { isSlect: false, index: 2 },
                { isSlect: false, index: 3 },
                { isSlect: false, index: 4 },
                { isSlect: false, index: 5 }
            ],
            selectedStar: 0,
            reviewCotent: '',
            listImg: [],
            borderColor: "#EBF0FF",
            filePath: {}
        }
    }

    requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    }

    requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                console.log('Write permission err', err);
            }
            return false;
        } else return true;
    }

    captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await this.requestCameraPermission();
        let isStoragePermitted = await this.requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    Alert.alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                let uri = response.assets[0].uri
                let imagePath = this.state.listImg
                imagePath.push(uri)
                this.setState({ listImg: imagePath })
            });
        }
    };

    chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                Alert.alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                Alert.alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            let uri = response.assets[0].uri
            let imagePath = this.state.listImg
            imagePath.push(uri)
            this.setState({ listImg: imagePath })
        });
    };

    handleChooseStar = (item) => {
        let arr = this.state.arrStar
        for (let i = 0; i < 5; i++) {
            if (item.index >= arr[i].index)
                arr[i].isSelect = true
            else
                arr[i].isSelect = false
        }
        this.setState({
            arrStar: arr,
            selectedStar: item.index
        })
    }

    renderBorderColor = (type) => {
        if (type === 'focus')
            this.setState({ borderColor: '#40BFFF' })
        else
            this.setState({ borderColor: '#EBF0FF' })
    }

    handleChooseImage = () => {
        console.log("Choose image review", "",
            [
                {
                    text: "Capture image",
                    onPress: () => console.log("Capture photo or video", "", [
                        {
                            text: "Capture a photo",
                            onPress: () => this.captureImage('photo')
                        },
                        {
                            text: "Capture video",
                            onPress: () => this.captureImage('video')
                        },
                    ])
                },

                {
                    text: "Choose image",
                    onPress: () => console.log("Choose photo or video", "", [
                        {
                            text: "Choose a photo",
                            onPress: () => this.chooseFile('photo')
                        },
                        {
                            text: "Choose a video",
                            onPress: () => this.chooseFile('video')
                        },
                    ])
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
                // onDismiss: () =>
                //     console.log(
                //         "Request was dismissed by tapping outside of the console.log dialog."
                //     ),
            })
    }

    render() {
        const { navigation, route } = this.props
        const { arrStar, selectedStar, reviewCotent, listImg, borderColor } = this.state

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CustomHeader
                            headerLeft={() => headerLeft({ navigation: navigation, routeName: route.name })}
                        />
                        <Text style={styles.title}>Please write Overall level of satisfaction with your shipping / Delivery Service</Text>

                        <View style={styles.chooseStar}>
                            <FlatList
                                data={arrStar}
                                keyExtractor={val => Math.random()}
                                scrollEnabled={false}
                                horizontal={true}
                                style={{ flexGrow: 0 }}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => this.handleChooseStar(item)}>
                                        <Image
                                            source={
                                                item.isSelect ?
                                                    require('../../../image/star.png') :
                                                    require('../../../image/unstar.png')
                                            }
                                            style={styles.starIcon}
                                        />
                                    </TouchableOpacity>
                                } />

                            <Text style={styles.selectedStar}>{selectedStar}/5</Text>
                        </View>

                        <Text style={[styles.title, { marginBottom: 12 }]}>Write Your Review</Text>
                        <TextInput
                            onFocus={() => this.renderBorderColor('focus')}
                            onBlur={() => this.renderBorderColor('unfocus')}
                            value={reviewCotent}
                            onChangeText={(text) => this.setState({ reviewCotent: text })}
                            placeholder="Write your review here"
                            style={[styles.content,
                            {
                                fontWeight: reviewCotent ? '700' : '400',
                                borderColor: borderColor
                            }
                            ]}
                        />


                        <Text style={[styles.title, { marginBottom: 12 }]}>Add Photo</Text>
                        <View style={styles.chooseImage}>
                            {listImg.length > 0 && listImg.map((uri, index) => (
                                <Image
                                    key={Math.random}
                                    source={{ uri: uri }}
                                    style={[styles.square, { resizeMode: 'contain' }]}
                                />
                            ))}
                            {
                                listImg.length < 4 && (
                                    <TouchableOpacity style={styles.square} onPress={this.handleChooseImage}>
                                        <Image
                                            source={require('../../../image/plus.png')}
                                            style={styles.plus}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </ScrollView>
                    <PrimaryBlueButton
                        title="Submit"
                        onPress={() => { }}
                        marginBottom={18}
                    />
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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WriteReview)