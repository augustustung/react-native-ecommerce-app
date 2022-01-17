import React, { useCallback, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Slider from 'rn-range-slider';
import Rail from './Rail';
import RailSelected from './RailSelected';
import styles from './CustomSliderStyles';
import Thumb from './Thumb';
import { currencyFormat } from '../../ultis/CommonUlti'
import { ColorConst } from '../../ultis/constant';

const SliderScreen = () => {
    const [borderLowColor, setBorderLowColor] = useState(ColorConst.NEUTRAL_LIGHT)
    const [borderHightColor, setBorderHightColor] = useState(ColorConst.NEUTRAL_LIGHT)
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(9999);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(9999);

    //nut bam
    const renderThumb = useCallback(() => <Thumb />, []);
    //khoang khong chon
    const renderRail = useCallback(() => <Rail />, []);
    //khoang chon
    const renderRailSelected = useCallback(() => <RailSelected />, []);

    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    return (
        <View style={styles.root}>
            <View style={styles.horizontalContainer}>
                <View
                    style={[styles.containerValue, { marginRight: 18, borderColor: borderLowColor }]}
                >
                    <Text style={styles.leading}>$</Text>
                    <TextInput
                        numberOfLines={1}
                        value={currencyFormat(low)}
                        keyboardType="numeric"
                        onFocus={() => setBorderLowColor(ColorConst.PRIMARY_BLUE)}
                        onBlur={() => setBorderLowColor(ColorConst.NEUTRAL_LIGHT)}
                        style={styles.valueText}
                        onChangeText={(text) => setLow(+text)}
                    />
                </View>
                <View
                    style={[styles.containerValue, { borderColor: borderHightColor }]}
                >
                    <Text style={styles.leading}>$</Text>
                    <TextInput
                        numberOfLines={1}
                        keyboardType="numeric"
                        onFocus={() => setBorderHightColor(ColorConst.PRIMARY_BLUE)}
                        onBlur={() => setBorderHightColor(ColorConst.NEUTRAL_LIGHT)}
                        value={currencyFormat(high)}
                        style={styles.valueText}
                        onChangeText={(text) => setHigh(+text)}
                    />

                </View>
            </View>
            <Slider
                style={styles.slider}
                min={min}
                max={max}
                step={1}
                disableRange={false}
                floatingLabel={true}
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                // renderLabel={renderLabel}
                onValueChanged={handleValueChange}
            />
            <View style={styles.footer}>
                <Text style={styles.footerText}>MIN</Text>
                <Text style={styles.footerText}>MAX</Text>
            </View>
        </View>
    )
};

export default SliderScreen;