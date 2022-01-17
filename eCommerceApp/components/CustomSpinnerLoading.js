import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../redux/actions/actionsTypes';

function CustomSpinLoading() {
    const [spin, setSpin] = useState(false)

    const appLoading = useSelector(state => state.app.process)
    const userLoading = useSelector(state => state.user.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (appLoading || userLoading) {
            setSpin(true)
            setTimeout(() => {
                dispatch({ type: actionTypes.PROCESS_ACTION_FAILED })
                dispatch({ type: actionTypes.PROCESS_APP_ACTION_FAILED })
            }, 3000)
        }
        else setSpin(false)
    }, [appLoading, userLoading])

    return (
        <View style={styles.container}>
            <Spinner
                visible={spin}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    )
}

export default CustomSpinLoading

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#ecf0f1',
        position: 'absolute',
        zIndex: 3
    },
    spinnerTextStyle: {
        color: '#fff',
    },
});
