import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

export function DropDown({ data, onChange, dropDownPlaceholder }) {
	return (
		<SelectDropdown
			data={data}
			defaultButtonText={dropDownPlaceholder}
			onSelect={(selectedItem) => {
				onChange(selectedItem.title);
			}}
			buttonTextAfterSelection={(selectedItem) => {
				return selectedItem.title;
			}}
			rowTextForSelection={(item) => {
				return item.title;
			}}
			renderButton={(selectedItem, isOpened) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						<Text style={styles.dropdownButtonTxtStyle}>
							{(selectedItem && selectedItem.title) ||
								dropDownPlaceholder}
						</Text>
						<FontAwesome
							name={isOpened ? 'chevron-up' : 'chevron-down'}
							style={styles.dropdownButtonArrowStyle}
						/>
					</View>
				);
			}}
			renderItem={(item, isSelected) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...(isSelected && {
								backgroundColor: '#fff',
							}),
						}}
					>
						<Text style={styles.dropdownItemTxtStyle}>
							{item.title}
						</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={false}
			dropdownStyle={styles.dropdownMenuStyle}
		/>
	);
}

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: '100%',
		marginTop: 25,
		height: 50,
		backgroundColor: '#FFF',
		borderRadius: 3,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownMenuStyle: {
		backgroundColor: '#FFF',
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 12,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '500',
		color: '#151E26',
	},
});
