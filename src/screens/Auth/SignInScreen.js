import React, { useState } from 'react';
import {
    View, StyleSheet, Text, ActivityIndicator,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Input, Button } from "@rneui/base";
import auth from '@react-native-firebase/auth';

import { Components, Typography } from '../../styles';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(__DEV__ ? 'hema@gmail.com' : '');
    const [pass, setPass] = useState(__DEV__ ? '123456' : '');
    const [loading, setLoading] = useState(false);

    async function onSubmit() {
        if (loading)
            return;
        setLoading(true);

        try {
            let result = await auth().signInWithEmailAndPassword(email, pass);
            // console.log("signin result: ", result)
        } catch (error) {
            console.log("signin error: ", error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
            <View style={styles.container}>
                <Text style={Typography.Title}>CloQ Second Challenge</Text>
                <View style={{ marginBottom: 40 }} />
                <Input
                    inputStyle={Typography.InputText}
                    inputContainerStyle={Components.inputContainerText}
                    containerStyle={Components.inputView}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    maxLength={100}
                    rightIcon={{ type: 'antdesign', name: 'user' }}
                />

                <Input
                    inputStyle={Typography.inputText}
                    inputContainerStyle={Components.inputContainerText}
                    containerStyle={Components.inputView}
                    autoCapitalize='none'
                    keyboardType="default"
                    secureTextEntry
                    placeholder='Password'
                    rightIcon={{ type: 'materialicon', name: 'lock-outline' }}
                    value={pass}
                    onChangeText={setPass}
                    maxLength={100}
                />

                <Button
                    title='Login'
                    titleStyle={Typography.BtnText}
                    containerStyle={[Components.ButtonContainer, { marginTop: 30 }]}
                    size={'lg'}
                    onPress={onSubmit}
                // buttonStyle={{height: 50}}
                />
                <Button title="Don't have account? SignUP"
                    type='clear'
                    size='sm'
                    titleStyle={styles.signupText}
                    onPress={() => navigation.navigate('Signup')}
                />

                <ActivityIndicator size="large" animating={loading} color="#B7163A" style={Components.LoadingCentered} />
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnContainer: {
        width: "80%",
        borderRadius: 25,
        marginTop: 30,
        // height: 50,
    },
    signupText: {
        fontSize: 14,
    }
});

export default SignInScreen;