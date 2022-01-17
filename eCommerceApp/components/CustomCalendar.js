import React, { useState, useEffect } from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker'
import { normalize, normalizeV, SCREEN_WIDTH } from '../ultis/Dimentions';
import { ColorConst } from '../ultis/constant'

export default function Calendar({ setSelectedDay, selectedDay }) {
    const [inititalDate, setInitialDate] = useState(null)

    useEffect(() => {
        if (selectedDay && !inititalDate) {
            const init = selectedDay.split('-')
            setInitialDate(new Date(Number(init[2]), Number(init[0]) - 1, Number(init[1])))
        }
    }, [])

    //footer
    const customDatesStylesCallback = date => {
        switch (date.isoWeekday()) {
            case 7: // Sunday
                return {
                    containerStyle: styles.containerStyle,
                    textStyle: [styles.textStyle, {
                        color: ColorConst.PRIMARY_RED
                    }]
                };
            default:
                return {
                    containerStyle: styles.containerStyle,
                    textStyle: styles.textStyle
                };
        }
    }

    //header
    const customDayHeaderStylesCallback = ({ dayOfWeek, month, year }) => {
        switch (dayOfWeek) { // can also evaluate month, year
            case 7: // Sunday
                return {
                    //day of week
                    style: styles.containerStyle,
                    textStyle: [styles.textStyle, {
                        color: ColorConst.PRIMARY_RED,
                        fontWeight: '700'
                    }]
                }
            default:
                return {
                    style: styles.containerStyle,
                    textStyle: [styles.textStyle, {
                        color: ColorConst.NEUTRAL_GREY,
                        fontWeight: '700'
                    }]
                }
        }
    }

    const minDate = new Date(1990, 1, 1)
    const maxDate = new Date()

    return (
        <CalendarPicker
            initialDate={inititalDate}
            minDate={minDate}
            maxDate={maxDate}
            onDateChange={(date) => setSelectedDay(date)}
            customDayHeaderStyles={customDayHeaderStylesCallback}
            customDatesStyles={customDatesStylesCallback}
            selectedDayStyle={styles.selectedDayStyle}
            selectedDayTextStyle={styles.selectedDayTextStyle}
            dayLabelsWrapper={styles.dayLabelsWrapper}
            yearTitleStyle={styles.yearTitleStyle}
            headerWrapperStyle={styles.headerWrapperStyle}
            monthTitleStyle={styles.yearTitleStyle}
            nextComponent={
                <Image
                    source={require('../image/right.png')}
                    style={styles.button}
                />
            }
            previousComponent={
                <Image
                    source={require('../image/left.png')}
                    style={styles.button}
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        width: normalize(49),
        height: normalize(49),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: ColorConst.NEUTRAL_GREY,
        fontWeight: "400",
        fontSize: normalize(12),
        lineHeight: normalizeV(18)
    },
    button: {
        width: normalize(24),
        height: normalize(24)
    },
    selectedDayTextStyle: {
        color: '#fff',
        fontSize: normalize(12),
        fontWeight: '700',
        lineHeight: normalizeV(18)
    },
    selectedDayStyle: {
        backgroundColor: ColorConst.PRIMARY_BLUE,
        width: '100%',
        height: "100%",
        borderRadius: 0
    },
    dayLabelsWrapper: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        paddingBottom: 0,
        paddingTop: 0
    },
    yearTitleStyle: {
        color: ColorConst.NEUTRAL_DARK,
        fontWeight: '700',
        fontSize: normalize(14),
        lineHeight: normalizeV(21),
        letterSpacing: 0.5
    },
    headerWrapperStyle: {
        borderWidth: 1,
        borderColor: ColorConst.NEUTRAL_LIGHT,
        borderBottomWidth: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: SCREEN_WIDTH - 32,
        paddingTop: normalizeV(16),
        paddingBottom: normalizeV(16),
        alignItems: 'center',
        marginBottom: 0
    }
});