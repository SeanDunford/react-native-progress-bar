import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

function isEmpty(value) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value.length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return true;
}

function spaceCamelCase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

const dimensions = {
    defaultSpace: 20,
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
};

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

const defaultWidth = dimensions.windowWidth - 2 * 20;
const defaultHeight = dimensions.defaultSpace * 1.75;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginTop: dimensions.defaultSpace * 2,
    width: defaultWidth,
    marginHorizontal: 20,
    backgroundColor: 'orange'
  },
  header: {
    marginBottom: dimensions.defaultSpace,
    height: 100,
    backgroundColor: 'blue'
  },
  content: {
    height: defaultHeight,
    width: defaultWidth,
    left: 0,
  },
  backgroundView: {
    flexDirection: 'row',
    height: defaultHeight,
    justifyContent: 'space-between',
  },
  percentageBar: {
    width: (defaultWidth - 4) / 5,
    backgroundColor: colors.purpleDark,
    height: defaultHeight,
  },
  progressBar: {
    width: defaultWidth,
    height: defaultHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    marginHorizontal: 20,
    backgroundColor: colors.purple,
  },
  goalText: {
    marginTop: dimensions.defaultSpace / 5,
    textAlign: 'right',
  },
});

function getActivityTypeText(activityType) {
  if (activityType === 'calories') {
    return 'TOTAL CALORIES';
  }

  return spaceCamelCase(activityType).toUpperCase();
}

class ProgressBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressWidth: new Animated.Value(0),
      porgressPosition: new Animated.Value(-1000),
    };
  }

  componentDidMount() {
    this.animateBox();
  }

  componentDidUpdate() {
    this.animateBox();
  }

  animateBox() {
    const { current, total } = this.props;
    const progressValue = Math.min(current / total, 1);


    Animated.timing(this.state.progressWidth, {
      toValue: progressValue,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.state.porgressPosition, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  render() {

    const { current, total } = this.props;
    // if (
    //   isEmpty(total) ||
    //   isEmpty(current)
    // ) {
    //   console.log("bailing early")
    //   return null;
    // }

    const maxedOut = current >= total;
    const units = 'POINTS';

    const percentComplete = Math.min(total / current, 1);
    const scaling = this.props.animated ? this.state.progressWidth : percentComplete;

    const progressBarStyle = [
      styles.progressBar,
      {
        transform: [
          { scaleX: this.state.progressWidth},
          { translateX: this.state.porgressPosition}
        ],
      },
    ];
    const goalTextStyle = [styles.goalText];

    if (maxedOut) {
      progressBarStyle.push({ backgroundColor: colors.gold });
      goalTextStyle.push({ color: colors.gold });
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.header}</Text>
        <View style={styles.content}>
          <View style={styles.backgroundView}>
            <View style={styles.percentageBar} />
            <View style={styles.percentageBar} />
            <View style={styles.percentageBar} />
            <View style={styles.percentageBar} />
            <View style={styles.percentageBar} />
          </View>
          <Animated.View style={progressBarStyle} />
        </View>
        <Text style={goalTextStyle}>
          {`${Math.ceil(current)} / ${Math.ceil(total)} ${units}`}
        </Text>
      </View>
    );
  }
}

ProgressBox.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  header: PropTypes.string.isRequired,
  animated: PropTypes.bool,
};

ProgressBox.defaultProps = {
  animated: true,
};

export default ProgressBox;
