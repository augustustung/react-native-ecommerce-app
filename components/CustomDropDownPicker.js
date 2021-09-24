import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { ColorConst } from '../ultis/constant'
import { normalize, normalizeV } from '../ultis/Dimentions'

const CustomDropDownPicker = ({
    open,
    selectedValue,
    listItems,
    setOpen,
    setSelectedValue,
    setItems,
    borderColor
}) => {
    return (
        <DropDownPicker
            open={open}
            value={selectedValue}
            items={listItems}
            setOpen={setOpen}
            setValue={setSelectedValue}
            setItems={setItems}
            style={{
                borderColor: borderColor ? borderColor : open ? "#40BFFF" : "#EBF0FF",
                height: normalizeV(48),
                borderRadius: 5
            }}
            dropDownContainerStyle={{
                borderColor: ColorConst.NEUTRAL_LIGHT,
                marginTop: normalizeV(8)
            }}
            textStyle={{
                color: ColorConst.NEUTRAL_GREY,
                fontSize: normalize(12),
                fontWeight: '700',
                lineHeight: normalizeV(21.6)
            }}
            selectedItemLabelStyle={{
                color: ColorConst.PRIMARY_BLUE
            }}
            listItemLabelStyle={{
                fontWeight: '400'
            }}
            arrowIconStyle={{
                width: normalize(24),
                height: normalize(24)
            }}
            showTickIcon={false}
        />
    )
}

export default CustomDropDownPicker