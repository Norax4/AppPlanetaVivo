import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";

export const RegisterUser = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [residenceZone, setResZone] = useState('');
    const [profilePic, setProfilePic] = useState(''); //Most likely use expo image and expo image picker

    const clearData = () => {
        setUserName("");
        setPassword("");
        setEmail("");
        setAge("");
        setResZone("");
        setProfilePic("");
    }

    const registerUser = async () => {

        console.log("states", userName, password, email, age, residenceZone);

        if (!userName.trim()) {
            Alert.alert("Ingrese su nombre de usuario");
            return;
        }
        if(!password.trim()){
            Alert.alert("Ingrese su password");
            return;
        }
        if(!email.trim() && email.indexOf("@") < 1 && email.indexOf(".com") === -1){
            Alert.alert("Ingrese su email correctamente");
            return;
        }
        if(!age.trim()){
            Alert.alert("Ingrese su edad");
            return;
        }
        if(!residenceZone.trim()){
            Alert.alert("")
        }

        try {
            const user = {userName, email, password, age, residenceZone, profilePic}
            //AsyncStorage use email as key
        } catch(error) {
            //console error return
        }
    };

    return (
        <SafeAreaView >
            <View>
                
            </View>
        </SafeAreaView>
    );

}