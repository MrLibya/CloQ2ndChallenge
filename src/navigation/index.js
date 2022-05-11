import React, { useState, useEffect } from 'react'

import AuthStack from './AuthStack'
import AppStack from './AppStack'

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfoModule from '../modules/DeviceInfo';

export default () => {
    const [isLogged, setIsLogged] = useState(false);
    const [init, setInit] = useState(false);

    async function onAuthStateChanged(user) {
        // console.log("user: ", user)
        try {
            // auth().signOut()
            if (user) {
                setIsLogged(true);
                const device = await DeviceInfoModule.getSystemDetail();
                const battery = await DeviceInfoModule.getBattery();
                // using await might take sometime to store data in firestore then allow the user to use the app,
                // so will just allow the user to go through and update it in background
                firestore().collection('users').doc(user.uid).set(
                    {
                        email: user.email,
                        device,
                        battery
                    }
                );
            }
            else
                setIsLogged(false);

        }
        catch (err) {
            console.log("err: ", err)
        }
        finally {
            if (!init) setInit(true);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (!init)
        return false;

    return isLogged ? <AppStack /> : <AuthStack />


};