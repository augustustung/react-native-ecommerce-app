import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../ultis/Dimentions';

const THUMB_RADIUS = 12;

const Thumb = () => {
    return (
        <View style={styles.root}></View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: SCREEN_WIDTH * 0.053,
        height: SCREEN_WIDTH * 0.053,
        borderRadius: THUMB_RADIUS,
        backgroundColor: '#40BFFF',
        shadowColor: "#40BFFF1A",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: THUMB_RADIUS,
        elevation: 5
    },
});

export default memo(Thumb);