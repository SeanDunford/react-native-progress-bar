import React from "react";
import { Animated, Easing, Text, View } from "react-native";

const defaultHeight = 40;

const colors = {
	gold: '#B49B57',
	lightGold: '#EEE8AA',
	mediumGold: '#AD9400',
	darkGold: '#8d783f',
	gray: '#666766',
	darkGray: '#4D4D4D',
	lightGray: '#C0C0C0',
	lighterGray: '#DCDCDC',
	danger: '#dc3545',
	purple: '#5b479c',
	purpleDark: '#1f1834',
	black: '#000000',
	white: '#ffffff',
};

const styles = {
  header: {
    fontFamily: 'Menlo',
    fontSize: 12, 
    fontWeight: '900',
    marginVertical: 8,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    height: defaultHeight,
    backgroundColor: 'rgba(60,60,60,0.3)',
    overflow: 'hidden',
  },
  progressBar: {
    height: defaultHeight,
    width: '100%',
    overflow: 'hidden',
    position: 'absolute',
    left: 0, 
    top: 0,
  },
  footer: {
    fontFamily: 'Menlo',
    fontSize: 12, 
    fontWeight: '900',
    marginVertical: 8,
    textAlign: 'right',
  }, 
  tickContainer: {
    flexDirection: 'row',
    height: defaultHeight,
    justifyContent: 'space-evenly',
  },
  tick: {
    width: 1,
    height: defaultHeight,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
}

function generateLabel(current, total, unit) {
  let label = `${current} / ${total}`;
  if(unit) {
    label = `${label} ${unit}`;
  }
  return label.toUpperCase();
}

function TickBars({count, color}) {
  const styleOverload = {};
  return (
    <View style={styles.tickContainer}>
      <View style={{...styles.tick, ...styleOverload}} />
      <View style={{...styles.tick, ...styleOverload}} />
      <View style={{...styles.tick, ...styleOverload}} />
      <View style={{...styles.tick, ...styleOverload}} />
  </View>
  )
}

export default function ProgressBar({
  headerText, 
  current, 
  total, 
  unit, 
  tickColor, 
  backgroundColor, 
  progressBarColor='rgba(100,100,100,1)',
  progressBarFullColor,
  animationDuration=1500,
}) {
  if(current < 0) {
    current = 0;
  }
  if(total < 0 ) {
    total = 0; 
  }
  const [width, setWidth] = React.useState(0);
  // React use Ref ensures react keeps track of the render and the animated value is the same during rerenders ? 
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  const label = generateLabel(current, total, unit);

  const progressBarStyle = { 
    ...styles.progressBar, 
    ...{ 
      backgroundColor: progressBarColor, 
      transform: [{ translateX: animatedValue }] 
    }
  };

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive, 
      duration: animationDuration, 
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  React.useEffect(() => {
    let multiplier = current/total;

    // Cap multiplier @ 1 so it doesn't go past. 
    multiplier = Math.min(multiplier, 1);
    console.log("multiplier", multiplier);
    reactive.setValue(-width + (width  * multiplier));
  }, [current, width]);

	return (
    <View style={styles.container}>
      { headerText && <Text style={styles.header}>{headerText}</Text>}
      <View style={{ 
        ...styles.progressContainer, 
        }}>
        <TickBars />
        <Animated.View 
          onLayout={e => {
            const newWidth = e.nativeEvent.layout.width;
            setWidth(newWidth);
          }}
          style={progressBarStyle} />
      </View>
      <Text style={styles.footer}>{label}</Text>
    </View>
  );
};