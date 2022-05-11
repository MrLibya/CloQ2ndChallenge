import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Input, Button } from "@rneui/base";
import { Components, Typography } from '../../styles';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PoemInfoScreen = ({ route, navigation }) => {
    const poem = route.params?.poem;

    const [title, setTitle] = useState(poem?.title || '');
    const [content, setContent] = useState(poem?.content || '');
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            if (loading) return;
            setLoading(true);
            if (!title.length || !content.length)
                throw ("Fill all the data");

            const user = auth().currentUser;
            if (!user)
                throw ("Something wrong happend, Please login again");

            const data = {
                title,
                content,
                owner: user.uid
            }
            let collectionRef = firestore().collection('poems');
            if(poem)
                await collectionRef.doc(poem.id).update(data);
            else
                await collectionRef.add(data);
            navigation.pop();
        } catch (err) {
            console.log("Add poem error: ", err);
        } finally {
        }
    }

    return <View style={styles.container}>
        <Input
            inputStyle={Typography.InputText}
            inputContainerStyle={Components.inputContainerText}
            containerStyle={Components.inputView}
            placeholder='Poem title'
            value={title}
            onChangeText={setTitle}
            maxLength={100}
        />
        <Input
            inputStyle={Typography.InputText}
            inputContainerStyle={Components.inputContainerText}
            containerStyle={[Components.inputView, { height: 120 }]}
            placeholder='Poem content'
            value={content}
            onChangeText={setContent}
            maxLength={100}
            multiline
        />

        <Button
            title={poem ? 'Update poem' : 'Add poem'}
            titleStyle={Typography.BtnText}
            containerStyle={[Components.ButtonContainer, { marginTop: 30 }]}
            size={'lg'}
            onPress={onSubmit}
        />

        <ActivityIndicator size="large" animating={loading} color="#B7163A" style={Components.LoadingCentered} />

    </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent:'center'
    }
});

export default PoemInfoScreen;