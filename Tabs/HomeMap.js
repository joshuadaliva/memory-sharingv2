import {ImageBackground, StyleSheet, View ,Text} from 'react-native';

const image = require('../assets/samplemap.png');

const HomeMap = () => {
  return (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    </ImageBackground>
  </View>
)
} ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
});

export default HomeMap;


