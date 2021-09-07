import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';

const {width} = Dimensions.get('window');

const Liquid = () => {
  const moveX = useSharedValue(width / 3);
  const moveY = useSharedValue(width / 3);

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: moveX.value,
        },
        {
          translateY: moveY.value,
        },
      ],
    };
  }, [moveX, moveY]);

  const subscription = accelerometer.subscribe(({x, y}) => {
    const distance = Math.sqrt(
      Math.abs(moveX.value) ** 2 + Math.abs(moveY.value) ** 2,
    );
    if (distance < width / 3) {
      moveX.value = moveX.value + x / 2;
      moveY.value = moveY.value + y / 2;
    } else {
      moveX.value = 0;
      moveY.value = 0;
    }
  });

  useEffect(() => {
    return () => {
      subscription.unsubscribe();
    };
  }, [subscription]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {
            backgroundColor: '#f00',
            height: 200,
            width: 200,
            borderRadius: 50,
          },
          panStyle,
        ]}
      />
    </View>
  );
};

export default Liquid;

const styles = StyleSheet.create({});
