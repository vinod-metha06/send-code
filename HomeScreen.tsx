import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Image, ActivityIndicator, Button } from 'react-native'
// import { fetchData } from '../Api/service';
import fetchDatafromAPI, { initialState } from '../Api/service';
import reducer from '../Hooks/reducers';


const HomeScreen = () => {

    const [txt, setTxt] = useState('');
    const [data, setData] = useState([]);
    const [state, a] = fetchDatafromAPI();


    // console.log(state.post + "hhh");

    useEffect(() => {

        // a(1);
        // console.log(state.post + "hhh");

    }, []);

    const search = (id) => {
        console.log(id);
        a(id);

    }


    const renderItemAPI = ({item}) => {

        console.log(item)

        // if(item=== undefined){


        // if (item?.id?.includes(txt)) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10, }}>
                    <Text style={{ textAlign: 'center', color: '#000', alignSelf: 'center' }}>{item.id}</Text>
                    <Image style={{ height: 100, width: 100 }} source={{ uri: item.url }} />
                </View>
            )
        //     }
        // }
    }
    if (state.loading) {
        return (
            <>
                <TextInput
                    placeholder='enter id'
                    onChangeText={t => setTxt(t)}
                    style={styles.input}
                />

                <Button title='serach'
                    onPress={() => search(txt)} />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            </>

        )
    }
    if (state.error) {
        console.log(state.post.error)
    }
    return (
        <View style={styles.container}>
            {/* <Text>{data.post.id}</Text> */}
            <TextInput
                placeholder='enter id'
                onChange={t => setTxt(t)}
                style={styles.input}
            />

            <Button title='serach'
                onPress={() => { search(txt) }} />

            {/* <FlatList
                data={state?.post?.slice(0,10)?state?.post?.filter(e=>e.id==+txt).slice(0,10):[]}
                renderItem={renderItemAPI}
                keyExtractor={item => item.id}
            /> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10, }}>
                <Text style={{ textAlign: 'center', color: '#000', alignSelf: 'center' }}>{state.post.id}</Text>
                <Image style={{ height: 100, width: 100 }} source={{ uri: state.post.url }} />
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        marginTop: 20,
        borderWidth: 2,
        borderRadius: 40,
        width: '90%',
        padding: 4,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
})

export default HomeScreen;


