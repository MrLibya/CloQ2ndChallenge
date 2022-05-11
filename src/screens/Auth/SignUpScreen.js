import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from "@rneui/base";
import auth from '@react-native-firebase/auth';

import { Components, Typography } from '../../styles';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const [loading, setLoading] = useState(false);

    async function onSubmit() {
        if (loading)
            return;
        setLoading(true);
        try {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!reg.test(email)) {
                throw ("Invail email");
            }
            if (pass.length < 6)
                throw ("Password must be more then 6 numbers");
            if (pass !== passConfirm)
                throw ("Password missmatch");

            const result = await auth().createUserWithEmailAndPassword(email, pass);
            console.log("signup result: ", result)
        } catch (error) {
            if (error?.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error?.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.log("signup error: ", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
            style={Components.KeyboardAvoidContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ marginBottom: 100 }} />

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
                    inputStyle={Typography.InputText}
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

                <Input
                    inputStyle={Typography.InputText}
                    inputContainerStyle={Components.inputContainerText}
                    containerStyle={Components.inputView}
                    autoCapitalize='none'
                    keyboardType="default"
                    secureTextEntry
                    placeholder='Confirm password'
                    rightIcon={{ type: 'materialicon', name: 'lock-outline' }}
                    value={passConfirm}
                    onChangeText={setPassConfirm}
                    maxLength={100}
                />

                <Button title='Signup' size={'lg'}
                    titleStyle={Typography.BtnText}
                    containerStyle={Components.ButtonContainer}
                    onPress={onSubmit}
                />
            </ScrollView>
            <ActivityIndicator size="large" animating={loading} color="#B7163A" style={Components.LoadingCentered} />
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        // backgroundColor:'red'
    },
});

export default SignUpScreen;