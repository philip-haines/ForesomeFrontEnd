import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, FlatList} from 'react-native';
import users from '../../assets/data/users';
import UserMatchPreview from '../components/UserMatchPreview';

const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.matchesContainer}>
        <Text style={styles.headerText}>New Matches</Text>
        <FlatList 
          data={users}
          renderItem={(user) => (
            <UserMatchPreview user={user} />
          )}
          keyExtractor={user => user.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{width: '100%'}, {flex: 1}, {backgroundColor: '#fbfbfc'}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root : {
    width: '100%',
    flex: 1,
  },
  // TODO: Turn container into Functional Styled Component
  matchesContainer: {
    width: '100%',
    padding: 10,
  },
  // TODO: BRANDING COLOR and BRANDING FONT for TEXT
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default MatchesScreen
