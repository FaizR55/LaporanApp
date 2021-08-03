import React, { Component } from 'react'
import { View, Text,FlatList, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';

export class HistoriLaporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFlatList:{}
        }
    }

    componentDidMount() {
            this.getData()
    }

    getData(){
        axios.get('http://192.168.100.5:8080/laporan/')
        .then((response)=>{
            let data =response.data
            console.log(data)
            this.setState({dataFlatList:data})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataFlatList}
                    keyExtractor={item=>parseInt(item.id)}
                    renderItem={({item})=>(
                        <View style={{borderWidth:5,borderColor:"red",flexDirection:"row",margin:5}}>
                            <Image style={{width:100,height:100}}
                                source={{uri:`http://192.168.100.5:8080/laporan/image/${item.image}`}}
                            />
                            <View style={{flexDirection:"column",alignSelf:"center"}}>
                                <Text style={styles.textStyle}>Kejadian : {item.kejadian}</Text>
                                <Text style={styles.textStyle}>Jam : {item.jam}</Text>
                                <Text style={styles.textStyle}>Alamat : {item.alamat}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    textStyle:{
        fontSize: 20,
        paddingLeft: 15,
    }
})

const mapStateToProps = (state) => ({
    isLogin: state.LoginReducer.isLogin
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoriLaporan)
