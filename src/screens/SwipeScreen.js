import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet} from 'react-native';
import UserCard from '../components/UserCard/index'
import users from '../../assets/data/users'
import AnimatedStack from '../components/AnimatedStack/index'

const SwipeScreen = () => {

  const onSwipeLeft = (user) => {
    console.log('swipe left', {user})
  }

  const onSwipeRight = (user) => {
    console.log('swipe right', {user})
  }

  return (
    <View style={styles.pageContainer}>
      <AnimatedStack 
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        />
    </View>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
    width: '100%',
  }
});

export default SwipeScreen;