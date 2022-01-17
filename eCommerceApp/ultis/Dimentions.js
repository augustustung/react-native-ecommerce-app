import { Dimensions, Platform, PixelRatio } from 'react-native'

export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

//based on iphone in design's scale
const scaleHorizontal = SCREEN_WIDTH / 375
const scaleVertical = SCREEN_HEIGHT / 734

export function normalize(size) {
    const newSize = size * scaleHorizontal
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export function normalizeV(size) {
    const newSize = size * scaleVertical
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}