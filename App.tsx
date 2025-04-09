// App.js
import React, {useEffect} from 'react';
import {View, Text, NativeModules} from 'react-native';

// Destructure your Swift-based module.
const {LPMessagingModule} = NativeModules;

const App = () => {
  useEffect(() => {
    // Call the native function to initialize the LivePerson SDK.
    LPMessagingModule.initializeSDK('your_account_identifier')
      .then(result => {
        console.log(result); // Expected: "SDK Initialized Successfully"
      })
      .catch(error => {
        console.error('Error initializing LPMessagingSDK: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>React Native & LivePerson SDK (Swift) Integrated!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
