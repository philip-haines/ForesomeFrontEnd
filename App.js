import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import UserCard from './src/components/UserCard';
import users from './assets/data/users';
import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const maximumRotation = -30;
const swipeVelocityMinimum = 800;

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(currentCardIndex + 1);

  const currentUserProfile = users[currentCardIndex];
  const nextUserProfile = users[nextCardIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const narrowedScreenWidth = screenWidth;

  const initialCurrentUserTranslateValue = 0.5;
  const currentUserCardPosition = useSharedValue(initialCurrentUserTranslateValue);
  const rotate = useDerivedValue(() => interpolate(currentUserCardPosition.value, [0, hiddenTranslateX], [0, maximumRotation]) + 'deg');
  const currentUserAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: currentUserCardPosition.value },
        { rotate: rotate.value }
      ],
    }
  });

  const nextUserCardScaleStart = 0.95;
  const nextUserCardOpacityStart = 0.65;
  const nextUserCardScale = useDerivedValue(() => interpolate(currentUserCardPosition.value, [-narrowedScreenWidth, 0, narrowedScreenWidth], [1, nextUserCardScaleStart, 1]));
  const nextUserCardOpacity = useDerivedValue(() => interpolate(currentUserCardPosition.value, [-narrowedScreenWidth, 0, narrowedScreenWidth], [1, nextUserCardOpacityStart, 1]));
  const nextUserAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: nextUserCardScale.value }
      ],
      opacity: nextUserCardOpacity.value
    }
  })

  // const checkForNextCard = () => !users[currentCardIndex] ? runOnJS(setCurrentCardIndex)(0) :  runOnJS(setCurrentCardIndex)(currentCardIndex + 1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = currentUserCardPosition.value;
    },
    onActive: (event, context) => {
      currentUserCardPosition.value = context.startX + event.translationX;
    },
    onEnd: (event, context) => {

      if(Math.abs(event.velocityX) < swipeVelocityMinimum){
        currentUserCardPosition.value = withSpring(initialCurrentUserTranslateValue);
        return;
      }

      currentUserCardPosition.value = withSpring(
        hiddenTranslateX * Math.sign(event.velocityX), 
        {}, 
        () => runOnJS(setCurrentCardIndex)(currentCardIndex + 1)
      );
    }
  });

  useEffect(() => {
    currentUserCardPosition.value = 0;
    runOnJS(setNextCardIndex)(currentCardIndex + 1)
  }, [currentCardIndex, currentUserCardPosition])


  return (
    <View style={styles.pageContainer}>
      {nextUserProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[nextUserAnimationStyles, styles.cardContainer, styles.nextCardContainer]}>
            <UserCard user={nextUserProfile}/>
          </Animated.View>
        </View>
      )}

      {currentUserProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.cardContainer, currentUserAnimationStyles]}>
            <UserCard user={currentUserProfile}/>
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject
  }
});

export default App;