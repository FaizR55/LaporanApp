import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Platform, Button, Image, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';


export class Laporan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            kejadian:"",
            alamat:"",
            keterangan:"",
            image:"https://asset.kompas.com/crops/7aeyQXv6hi9593Gh1ppQgPeSMkg=/0x8:1747x1172/750x500/data/photo/2020/11/26/5fbf40c4507ae.jpg",
            latitude:"",
            longitude:"",
        }
    }

    componentDidMount(){
        this.getPermission()
        this.getLocation()
    }

    async getPermission(){
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    async pickImage(){
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
          
          if (!result.cancelled) {
              console.log(result.uri)
              this.setState({image:result.uri})
          }
    }
    
    async getLocation(){
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log("Lokasinya adalah :" + JSON.stringify(location));

        this.setState({
            latitude: location.coords.latitude,
            longitude:location.coords.longitude
        })
    };

    handlerSubmit(){
        
        let formData = new FormData();
        let filename = this.state.image;
        console.log("nama gambar "+ filename.split('/').pop())
        formData.append('data',JSON.stringify(this.state))
        formData.append('file',{
            uri: this.state.image, //Your Image File Path
            type: 'image/jpeg', 
            name: filename.split('/').pop(),
         })
        axios.post('http://192.168.100.5:8080/laporan/',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            alert(response.data)
            this.props.navigation.navigate("MainMenu")
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.textStyle}> Name </Text>
                <TextInput style={styles.input} placeholder="masukan nama" onChangeText={(value)=>{this.setState({name:value})}}/>
                <Text style={styles.textStyle}> Kejadian </Text>
                <Picker
                    selectedValue={this.state.kejadian}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => this.setState({ kejadian: itemValue })}>
                    <Picker.Item label="Masukan Pilihan"/>
                    <Picker.Item label="Perampokan" value="Perampokan" />
                    <Picker.Item label="Bencana" value="Bencana" />
                    <Picker.Item label="Pembunuhan" value="Pembunuhan" />
                </Picker>
                
                <Text style={styles.textStyle}> Alamat </Text>
                <TextInput style={styles.input} placeholder="masukan alamat" onChangeText={(value)=>{this.setState({alamat:value})}}/>

                <Text style={styles.textStyle}> Keterangan </Text>
                <TextInput style={styles.input} placeholder="masukan keterangan" onChangeText={(value)=>{this.setState({keterangan:value})}}/>

                <Button title="Pick an image from camera roll" onPress={()=>{this.pickImage()}} />
                <Image source={{ uri: this.state.image }} style={{ width: 300, height: 300,alignSelf:'center' }} />
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{this.handlerSubmit()}}><Text style={styles.textStyle2}>Tambah Laporan</Text></TouchableOpacity>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Laporan)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    buttonStyle:{
        borderWidth:10,
        borderColor:"red",
        margin:20
    },
    textStyle:{
        fontSize: 15,
        padding: 10,
        fontWeight: 'bold',
    },
    textStyle2:{
        textAlign:'center',
        fontSize: 20,
    },
    input:{
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 10,
    }


})