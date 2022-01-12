import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import UserCard from './src/components/UserCard';
import users from './assets/data/users';
import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const App = () => {
  const {width: screenWidth} = useWindowDimensions();

  const cardPosition = useSharedValue(0.5);
  const rotate = useDerivedValue(() => interpolate(cardPosition.value, [0, screenWidth], [0, 20]) + 'deg');
  const animatedCardStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardPosition.value },
        { rotate: rotate.value }
      ],
    }
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = cardPosition.value;
    },
    onActive: (event, context) => {
      cardPosition.value = context.startX + event.translationX;
      console.log(cardPosition.value)
    },
    onEnd: (_, context) => {
      console.log('touch end');
    }
  });

  return (
    <View style={styles.pageContainer}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.animatedCard, animatedCardStyles]}>
          <UserCard user={users[3]}/>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  animatedCard: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  }
});

export default App;