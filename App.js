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

const enableTimer = false;

const App: () => Node = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const [current, setcurrent] = React.useState(2000);
  const total = 1000;

  if(enableTimer){
    React.useEffect(() => {
      const interval = setInterval(() => {
        setcurrent(current + 10)  
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [current]);
  }

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
            unit={"Points"}
            animated={true} 
            header={"this is a dope header"} 
            />
          </View>
          <View style={styles.content}>
            <ProgressBar
              progressBarColor='green'
              headerText="PersonalGoal"
              current={current}
              total={total}
              unit={"Points"}
              height={20} />
          </View>
        <View style={styles.footer}/>
      </View>
    </SafeAreaView>
  );
};

export default App;
