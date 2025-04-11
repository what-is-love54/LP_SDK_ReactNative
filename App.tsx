/** @format */

import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// ---------------------------------------------------------------1
import {LivePersonModule} from './source';

const accID = '14800077';
const jwt =
	// eslint-disable-next-line max-len
	'eyJhbGciOiJSUzI1NiJ9.eyAgInN1YiI6ICJwdWJsaWNfcXVpY2tzdGFydF91c2VyIiwgICJpc3MiOiAiaHR0cHM6Ly9MUC1BdXRoLmNvbSIsICAiZXhwIjoxNTg0Njc0MDc3LCAgImlhdCI6MTU1MzExNjQ3N30.tFtanIwh8SrmJWM5iSUxmj7WaroA_WCtZfTS4KN9N8Q0Vy0O5rRdb7T7ZkFJxnGfwg0fsKfBuM3qTD8NHWNOKqaZX_bQKXQ-cnJHa4DtJX9Udv0MGfg_UHO0DBg5vaC_38beUlSaUPQ0rQAHb9sm0PE1tNOMfLzvPqM1kF3VMBq1dZNpNkDYaV8oleEcm0v8woRj45FYOv34etrgSsf0Pi-68AP8ckG3WJzS_y9dpZAxW3oDIv_XXHZ4TXQw_wPwMKu0UtZoMfctz-5ERk7uTQxeWP6TS9ce2YQ38FqUwIBN3ImAhA3vE2gLsYexFsPiO_I3hSEC272Ya-b-eJZ8vg';

const App = () => {
	const openLivePersonConversation = useCallback(async () => {
		try {
			await LivePersonModule.initSDK(accID, jwt);
			await LivePersonModule.showConversation();
		} catch (err) {
			console.error('ERROR FROM JS Side', err);
		}
	}, []);

	useEffect(() => {
		openLivePersonConversation();
	}, [openLivePersonConversation]);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				React Native & LivePerson SDK (Swift and Kotlin) Integrating!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		color: '#000',
		textAlign: 'center',
	},
});

export default App;
