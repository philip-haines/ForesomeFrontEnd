import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet} from 'react-native';
import UserCard from '../components/UserCard/index'
import users from '../../assets/data/users'
import AnimatedStack from '../components/AnimatedStack/index'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
        <View style={styles.navigation}>
          <FontAwesome name="undo" size={30} color="#FBD88B" />
          <Entypo name="cross" size={30} color="#F76C6B" />
          <FontAwesome name="star" size={30} color="#3AB4CC" />
          <FontAwesome name="heart" size={30} color="#4FCC94" />
          <Ionicons name="flash" size={30} color="#A65CD2" />
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1,
    width: '100%',
    backgroundColor: '#fbfbfc',
    position: 'relative',
  },
  navigation:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'static',
    bottom: '10%',
  }
});

export default SwipeScreen;