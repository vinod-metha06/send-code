import React,{useReducer,useEffect,useState} from 'react';
import { View, Text, StyleSheet, FlatList,ActivityIndicator,Image } from 'react-native';
import { PhotoReducers,initailState } from '../reducers/PageReducers';
import { getPhotos } from '../reducers/service';


const PageHomeScreen = () => {
    const [state,dispatch]=useReducer(PhotoReducers,initailState);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        const getData=async()=>{
            var data =await getPhotos(page);
            if(data!=="error"){
                dispatch({type:"FETCH",payload:data});
            }else{
            dispatch({type:"FETCH_ERROR"});
            }
        }
        getData();
    },[page]);


    const renderItem=({item})=>{
        console.log(item.id);
        return(
        <View style={styles.card}>
          <Image
            source={{uri: item.url}}
            style={{height: 80, width: 60, resizeMode: 'contain'}}
          />
          <View style={{flexDirection: 'column',marginLeft:8}}>
            <Text>{item.id}</Text>
            <Text>{item.title}</Text>
          </View>
        </View>
        );
    }

    const renderFooter = () => {
        
         if (!state?.loading) return null;
         return (
           <ActivityIndicator
           color='black'
           size={50}
           />
         );
       };

    const  handleLoadMore = () => {
        if (!state?.loading) {
            dispatch({type:"LOADING"});
          setPage(page + 1); 
           
        }
      };

    return (
        <View style={styles.container}>
            <FlatList
            data={state?.photos}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.0}
            onEndReached={handleLoadMore}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    card: {
        marginTop: 10,
        backgroundColor: '#c8c8c8',
        borderRadius: 60,
        width: '90%',
        padding: 14,
        flexDirection: 'row',
      },
});


export default PageHomeScreen;
