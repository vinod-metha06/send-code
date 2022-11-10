import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {Authcontext} from '../navigation/AuthProvider';
import {FAB} from 'react-native-';
import {windowWidth} from '../utils/Dimensions';
import {Rating} from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const {data, setData} = useContext(Authcontext);

  const [fd, setFd] = useState([]);

  const storeD = async v => {
    try {
      await AsyncStorage.setItem('dl', JSON.stringify(v));
    } catch (error) {
      console.log(error);
    }
  };
  const getD = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('dl');
      const currentUser = JSON.parse(savedUser);
      setFd(currentUser);
      console.log(currentUser[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    storeD(data);
    getD();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.featured}>
        <TouchableOpacity style={styles.featuredItem} onPress={() => {}}>
          <View>
            <Image source={require('../assets/food.jpg')} style={styles.logo} />
            <Text style={styles.text}>Featured by admin</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        <>
          <FlatList
            data={fd}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                  console.log(item.product_name);
                }}>
                <View>
                  <Image
                    style={styles.imageThumbnail}
                    source={{uri: item.product_image}}
                  />
                  <Text style={styles.gridItemName}>
                    {item.product_name.length >= 20
                      ? item.product_name.substring(0, 20) + '...'
                      : item.product_name}
                  </Text>

                  <Rating
                    type="star"
                    fractions={1}
                    ratingCount={5}
                    imageSize={20}
                    showRating={false}
                    startingValue={item.likes}
                    readonly={true}
                    onFinishRating={() => {}}
                  />
                </View>
              </TouchableOpacity>
            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </>
      </View>

      <TouchableOpacity
        style={styles.fb}
        onPress={() => navigation.navigate('Add')}
        // onPress={() => {
        //   setData([
        //     ...data,
        //     {
        //       id: 11,
        //       product_name: 'Added',
        //       price: 29,
        //       rating: 5,
        //       product_image: 'https://armagazine.com/3DY4MH9',
        //       likes: 4,
        //     },
        //   ]);
        //   console.log(data);
        // }}
      >
        <Text style={{fontSize: 38, color: 'white'}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fb: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'blue',
    borderRadius: 100,
    elevation: 8,
  },
  featured: {
    flex: 0.35,
    color: '#ffeeed',
    backgroundColor: '#ffeeed',
    width: '100%',
    height: 250,
    padding: 4,
  },
  logo: {
    height: '80%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 20,
    color: '#051d5f',
    marginLeft: 10,
    marginTop: 14,
  },
  featuredItem: {
    color: 'red',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 40,
    height: '100%',
    elevation: 4,
    padding: 10,
  },
  grid: {
    flex: 0.65,
    color: 'red',
    backgroundColor: '#ffeeed',
    width: '100%',
    height: 250,
  },
  gridItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    elevation: 2,
    borderRadius: 25,
    padding: 4,
    backgroundColor: '#fff',
  },

  gridItemName: {
    color: 'black',
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    elevation: 4,
    borderRadius: 20,
  },
});

export default HomeScreen;
