import { StyleSheet, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { InputText } from '../../components/InputText';
import { InputNumber } from '../../components/InputNumber';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegisterRecMats() {
    return (
        <SafeAreaView>
            <View>
                <ScrollView>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	view: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#c9fdd7',
	},
	scrollView: {
		marginHorizontal: 30,
	},
	error: {
		color: 'red',
		marginTop: 5,
		fontWeight: 650,
		fontSize: 16,
	},
});