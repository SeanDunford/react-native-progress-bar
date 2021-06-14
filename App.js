/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { Node } from 'react';
import React from 'react';
import {
  SafeAreaView, StatusBar,
  StyleSheet, useColorScheme,
  View
} from 'react-native';
import ProgressBox from './src/progressBox';
import ProgressBar from './src/progressBar';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  footer: {
    flex: 1, 
  },
  header: {
    flex: 1,
  },
  content: {
    flex: 2,
  }
});


const App: () => Node = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const [index, setIndex] = React.useState(0);
  const maxSteps = 1000;
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * maxSteps))  
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.mainContainer}>
        <View style={styles.header} />
        <View style={styles.content}>
          <ProgressBox 
            total={1000} 
            current={666} 
            animated={true} 
            header={"this is a dope header"} 
            />
          </View>
          <View style={styles.content}>
            <ProgressBar
              step={index}
              steps={maxSteps}
              height={20} />
          </View>
        <View style={styles.footer}/>
      </View>
    </SafeAreaView>
  );
};

export default App;
