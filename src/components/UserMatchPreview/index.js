import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Pressable } from 'react-native'

const UserMatchPreview = (props) => {
  const { user } = props
  return (
  <Pressable style={styles.previewContainer}>
    <View style={styles.userImageContainer}>
      <ImageBackground source={{uri: user.item.image}} style={styles.userImage} imageStyle={styles.userImage}/>
    </View>
    <View style={styles.userNameContainer}>
      <Text style={styles.userName}>{user.item.name}</Text>
    </View>
  </Pressable>
) }


const styles = StyleSheet.create({
  previewContainer:{
    height: 140,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    paddingVertical: 5,
  },
  userImageContainer: {
    height: '80%',
    width: '100%',
  },
  userImage: {
    borderRadius: 6,
    ...StyleSheet.absoluteFillObject,
  },
});


export default UserMatchPreview
