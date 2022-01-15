import 'react-native-gesture-handler';
import React, {useState} from 'react';
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
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const maximumRotation = -30;

const App = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [nextCardIndex, setNextCardIndex] = useState(currentCardIndex + 1);

  const currentUserProfile = users[currentCardIndex];
  const nextUserProfile = users[nextCardIndex];

  const {width: screenWidth} = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;
  const narrowedScreenWidth = screenWidth - (screenWidth * 0.12);

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

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = currentUserCardPosition.value;
    },
    onActive: (event, context) => {
      currentUserCardPosition.value = context.startX + event.translationX;
    },
    onEnd: (_, context) => {
      // currentUserCardPosition.value = withSpring(initialCurrentUserTranslateValue);
    }
  });

  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.cardContainer, styles.nextCardContainer, nextUserAnimationStyles]}>
        <UserCard user={nextUserProfile}/>
      </Animated.View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.cardContainer, currentUserAnimationStyles]}>
          <UserCard user={currentUserProfile}/>
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
  cardContainer: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
  },
  nextCardContainer: {
    ...StyleSheet.absoluteFillObject
  }
});

export default App;