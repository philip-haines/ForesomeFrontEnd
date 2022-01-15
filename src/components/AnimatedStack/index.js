import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import Like from '../../../assets/images/LIKE.png';
import Nope from '../../../assets/images/nope.png';

const maximumRotation = -30;
const swipeVelocityMinimum = 800;

const AnimatedStack = (props) => {
  const { data, renderItem, onSwipeRight, onSwipeLeft } = props;


  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(currentCardIndex + 1);

  const currentUserProfile = data[currentCardIndex];
  const nextUserProfile = data[nextCardIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const reducedScreenSize = screenWidth - (screenWidth * 0.25)

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
  const nextUserCardScale = useDerivedValue(() => interpolate(currentUserCardPosition.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, nextUserCardScaleStart, 1]));
  const nextUserCardOpacity = useDerivedValue(() => interpolate(currentUserCardPosition.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, nextUserCardOpacityStart, 1]));
  
  const nextUserAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: nextUserCardScale.value }
      ],
      opacity: nextUserCardOpacity.value
    }
  })

  const likeSwatchOpacity = useDerivedValue(() => interpolate(currentUserCardPosition.value, [0, reducedScreenSize], [0, 1]));
  const likeSwatchStyle = useAnimatedStyle(() => {
    return {
      opacity: likeSwatchOpacity.value
    }
  })

  const nopeSwatchOpacity = useDerivedValue(() => interpolate(currentUserCardPosition.value, [0, -reducedScreenSize], [0, 1]));
  const nopeSwatchStyle = useAnimatedStyle(() => {
    return {
      opacity: nopeSwatchOpacity.value
    }
  })

  const handleSwipe = (swipeVelocity, user) => swipeVelocity > 0 ? onSwipeRight(user) : onSwipeLeft(user);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = currentUserCardPosition.value;
    },
    onActive: (event, context) => {
      currentUserCardPosition.value = context.startX + event.translationX;
    },
    onEnd: (event) => {

      const swipeVelocity = event.velocityX

      if(Math.abs(swipeVelocity) < swipeVelocityMinimum){
        currentUserCardPosition.value = withSpring(initialCurrentUserTranslateValue);
        return;
      }

      currentUserCardPosition.value = withSpring(
        hiddenTranslateX * Math.sign(swipeVelocity), 
        {
          damping: 800,
          mass: 0.5,
          stiffness: 250,
          overshootClamping: true,
          restSpeedThreshold: 0.05,
          restDisplacementThreshold: 0.05,
        }, 
        () => runOnJS(setCurrentCardIndex)(currentCardIndex + 1)
      );
      
      handleSwipe && runOnJS(handleSwipe)(swipeVelocity, currentUserProfile)
    }
  });

  useEffect(() => {
    currentUserCardPosition.value = 0;
    runOnJS(setNextCardIndex)(currentCardIndex + 1)
  }, [currentCardIndex, currentUserCardPosition])


  return (
    <View style={styles.stackContianer}>
      {nextUserProfile && (
        <View style={styles.nextCardContainer}>
          <Animated.View style={[styles.cardContainer, nextUserAnimationStyles]}>
            {renderItem({ item: nextUserProfile })}
          </Animated.View>
        </View>
      )}

      {currentUserProfile && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.cardContainer, currentUserAnimationStyles]}>
            {/* TODO: Move away from these images, turn into reuseable component */}
            <Animated.Image source={Like} style={[styles.swipeText, {left: 10}, likeSwatchStyle]} resizeMode='contain'/>
            <Animated.Image source={Nope} style={[styles.swipeText, {right: 10}, nopeSwatchStyle]} resizeMode='contain'/>
            {renderItem({ item: currentUserProfile })}
          </Animated.View>
        </PanGestureHandler>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  stackContianer: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  cardContainer: {
    width: '90%',
    height: '70%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipeText: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 10,
    zIndex: 1,
    elevation: 11,
  }
});

export default AnimatedStack;