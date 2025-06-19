import React, { useState, useEffect } from "react";
import { fetchAllChallenges } from "../../database/fetchFunctions";
import { Alert } from "react-native";

const ViewAllChallenges = ({ navigation }) => {
    const [challenges, setChallenges] = useState('');

    useEffect(() => {
        const res = fetchAllChallenges();

        if (res.lenght > 0) {
            setChallenges(res);
        } else {
            Alert.alert(
                        "Mensaje",
                        "¡No hay retos!",
                        [{ text: "OK", onPress: () => navigation.navigate("HomeScreen")}], {cancelable: false}
                    );
        }
    })
}