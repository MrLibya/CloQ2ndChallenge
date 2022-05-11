import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/App/HomeScreen";
import PoemInfoScreen from "../screens/App/PoemInfoScreen";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfoModule from '../modules/DeviceInfo';

const Stack = createNativeStackNavigator();

export default () => {

    React.useEffect(() => {
        const interval = setInterval(async () => {
            const user = auth().currentUser;
            const device = await DeviceInfoModule.getSystemDetail();
            const battery = await DeviceInfoModule.getBattery();
            if (user) {
                firestore().collection('users').doc(user.uid).update(
                    {
                        device,
                        battery
                    }
                );
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [])


    return (
        <Stack.Navigator
        // screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PoemInfo" component={PoemInfoScreen} />

        </Stack.Navigator>
    );
};