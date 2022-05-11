import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Button } from "@rneui/base";
import PoemItem from '../../components/PoemItem';
import DeviceInfoModule from '../../modules/DeviceInfo';


const HomeScreen = ({ navigation }) => {
    const [poems, setPoems] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [deviceBattery, setDeviceBattery] = useState(null);

    function onResult(QuerySnapshot) {
        setPoems(QuerySnapshot.docs)
    }

    function onError(error) {
        console.error("onerror:", error);
    }


    useEffect(() => {
        const user = auth().currentUser;
        const subscriber = firestore().collection('poems').where("owner", '==', user.uid).onSnapshot(onResult, onError);

        const init = async () => {
            const device = await DeviceInfoModule.getSystemDetail();
            const battery = await DeviceInfoModule.getBattery();
            setDeviceInfo(device);
            setDeviceBattery(battery);
        }

        init();
        return () => {
            subscriber();
        }
    }, [])

    const Header = () => (
        <Button
            title='Add new poem'
            icon={{ name: 'add', color: 'white' }}
            iconRight
            onPress={() => navigation.navigate('PoemInfo')}
            containerStyle={{ marginVertical: 30 }}
        />
    )

    const renderItem = ({ item }) => <PoemItem poem={item} />

    return <View style={styles.container}>
        <Text style={Typography.Title}>Welcome back,</Text>
        <Text style={Typography.text}>its lovelly day to write some poems !</Text>
        <Text style={styles.text}>My poems: </Text>
        {Boolean(deviceInfo) && <View>
            <Text style={Typography.TextSubTitle}>Device info: </Text>
            <Text style={{ color: 'black' }}>
                <Text style={{ fontWeight: 'bold' }}>Brand:</Text> {deviceInfo.Brand}
                <Text style={{ fontWeight: 'bold' }}> - ID:</Text> {deviceInfo.ID}
                <Text style={{ fontWeight: 'bold' }}> - Manufacture:</Text> {deviceInfo.Manufacture}
                <Text style={{ fontWeight: 'bold' }}> - Model:</Text> {deviceInfo.Model}
                <Text style={{ fontWeight: 'bold' }}> - Battery:</Text> {deviceBattery}%
            </Text>
        </View>}
        <FlatList
            data={poems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={[Typography.EmptyText, { marginTop: 40 }]}>You don't have any poems yet, add some !</Text>}
            ListHeaderComponent={Header}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 20 }} />}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 25,
        paddingBottom: 0
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginVertical: 30
    }
});
export default HomeScreen;