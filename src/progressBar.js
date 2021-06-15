import React from "react";
import { Animated, Easing, Text, View } from "react-native";

const defaultHeight = 10

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    height: defaultHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  bar: {
    height: defaultHeight,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    overflow: 'hidden',
    position: 'absolute',
    left: 0, 
    top: 0,
  },
  header: {
    fontFamily: 'Menlo',
    fontSize: 12, 
    fontWeight: '900',
    marginBottom: 8
  }
}

function generateLabel(current, total, unit) {
  let label = `${current} / ${total}`;
  if(unit) {
    label = `${label} ${unit}`;
  }
  return label;

}

export default function ProgressBar({current, total, height, unit}) {
  const [width, setWidth] = React.useState(0);
  // React use Ref ensures react keeps track of the render and the animated value is the same during rerenders ? 
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  const label = generateLabel(current, total, unit);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactive, 
      duration: 600, 
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, []);

  React.useEffect(() => {
    reactive.setValue(-width + (width  * current/total));
  }, [current, width]);

	return (
  <View style={styles.container}>
    <Text style={styles.header}>{label}</Text>
    <View style={{ 
      ...styles.progressContainer, 
      height, 
      borderRadius: 
      height,

      }}>
      <Animated.View 
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{ ...styles.bar, height, borderRadius: height, transform: [
          {
            translateX: animatedValue,
          }
        ] }} />
    </View>
  </View>
  );
}