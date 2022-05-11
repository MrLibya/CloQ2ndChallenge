import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from "@rneui/base";
import firestore from '@react-native-firebase/firestore';

const PoemItem = ({ poem }) => {
    const navigation = useNavigation();

    const { title, content } = poem.data();

    const onDelete = () => {
        Alert.alert('Are you sure ?', 'You will not be able to retrive the poem after delete',
            [
                {
                    text: 'Cancle',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => firestore().collection('poems').doc(poem.id).delete().then(() => { }).catch(() => { })
                },
            ])
    }

    return <Pressable style={styles.container} onPress={() => navigation.navigate('PoemInfo', { poem: { ...poem.data(), id: poem.id } })}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Icon name='delete' type='antdesign' containerStyle={styles.deleteIcon} onPress={onDelete} />
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'gray',
        padding: 10,
        padding: 8,
        // elevation:4
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16
    },
    content: {
        fontWeight: '400',
        color: 'black',
        fontSize: 13
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PoemItem;