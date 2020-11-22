import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import { formatMessage } from '../helpers/i18n';

export const PasswordInput = (props: any) => {

    const [icEye, setIcEye] = useState('visibility');
    const [password, setPassword] = useState(true);
	const changePwdType = () => {
		if (password) {
			setIcEye('visibility-off');
			setPassword(false);
			
		} else {
			setIcEye('visibility');
			setPassword(true);
		}
	};

    return (
        <View>
			<TextInput {...props} 
				label={formatMessage("Login.password.label")}
				mode="flat" 
				secureTextEntry={password} 
				style={{paddingHorizontal: 0, backgroundColor: "white"}}/>
            <Icon
                style={styles.icon}
                name={icEye}
                size={props.iconSize}
                color={props.iconColor}
                onPress={changePwdType}
            />
        </View>
    );
}

const styles = StyleSheet.create({

	icon: {
		position: 'absolute',
		top: 20,
		right: 10
	}

});

PasswordInput.defaultProps = {
	iconSize: 25
};