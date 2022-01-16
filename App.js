import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, View} from 'react-native';
import SwipeScreen from './src/screens/SwipeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  const color = '#D8DEE9'
  return (
    <SafeAreaView style={styles.pageContainer}>
      <SwipeScreen />
      <View style={styles.navigation}>
        <Fontisto name="tinder" size={30} color={color} />
        <MaterialCommunityIcons name="star-four-points" size={30} color={color} />
        <Ionicons name="ios-chatbubbles" size={30} color={color} />
        <FontAwesome name="user" size={30} color={color} />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  navigation:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

export default App;