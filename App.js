import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import UserCard from './src/components/UserCard';
import users from './assets/data/users';
import Animated, {
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated';

const App = () => {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const popupPosition = useSharedValue({x: 0, y: 0});
  const sharedValue = useSharedValue(0.5);

  const animatedPopupStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: sharedValue.value * 500 - 250}
      ],
    };
  });

  return (
    <View style={styles.pageContainer}>
      <Animated.View style={[styles.animatedCard, animatedPopupStyles]}>
        <UserCard user={users[0]}/>
      </Animated.View>
      <Pressable onPress={() => (sharedValue.value = withSpring(Math.random()))} style={{position: 'absolute', top: 100}}>
        <Text>Change Value</Text>
      </Pressable>
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