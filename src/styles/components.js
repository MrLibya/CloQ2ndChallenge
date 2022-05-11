import { StyleSheet } from "react-native"

export default StyleSheet.create({
    Loading: {
        position: 'absolute',
        alignSelf: 'center'
    },
    LoadingCentered: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: "50%"
    },
    inputView: {
        width: '90%',
        height: 50,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 0.5,
    },
    inputContainerText: {
        borderBottomWidth: 0
    },
    Shadow: {
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    TouchableShadow: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    KeyboardAvoidContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    ButtonContainer:{
        width: "80%",
        marginTop: 20,
        borderRadius: 25 
    }
});

