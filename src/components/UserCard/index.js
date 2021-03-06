import React from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'

const UserCard = (props) => {
  const {name, image, bio} = props.user
  return (
    <View style={styles.card}>
      <ImageBackground 
      source={{uri: image}}
      style={styles.image}
      resizeMode='cover'
      > 
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{ name }</Text>
        <Text style={styles.bio}>{ bio }</Text>
      </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fbfbfc',
    
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
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  infoContainer:{
    width: '90%',
    justifyContent: 'center',
    padding: 10,
    paddingBottom: '12%',
    alignItems: 'flex-start',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
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

export default UserCard;