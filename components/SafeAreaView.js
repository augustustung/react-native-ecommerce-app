import { SafeAreaView } from 'react-native'
import React from 'react'

function CustomSafeAreaView({ children }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {children}
        </SafeAreaView>
    )
}

export default CustomSafeAreaView