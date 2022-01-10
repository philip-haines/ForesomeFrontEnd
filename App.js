import React from 'react';
import { Text, Image, ImageBackground, View, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.card}>
        <ImageBackground 
        source={{uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg'}}
        style={styles.image}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.name}>The Zuck</Text>
            <Text style={styles.bio}>No need to send me your nudes, I already saw them</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1
  },
  card:{
    width: '95%',
    backgroundColor: 'red',
    height: '70%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 2.75/4.5,
    // height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  infoContainer:{
    width: '90%',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'flex-start',
  },
  name:{
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },
  bio:{
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
});


export default App;