import React, { Component } from 'react'
import axios from 'axios';
import { ScrollView, KeyboardAvoidingView, SafeAreaView, Text, Image, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';

export class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
            name:"",
            email:"",
            phone:"",
            address:"",
            password:""
        }
    }

    handlerSubmit(){
        //console.log(this.state)
        axios.post('http://192.168.100.5:8080/user/register/',this.state)
        .then((response)=>{
            alert(response.data)
            this.props.navigation.navigate('Home')
        })
        .catch((error)=>{
            console.log("ada error sebagai berikut : "+error)
        })
    }


    render() {
        return (
        <ScrollView contentContainerStyle={styles.signUpForm}>
            <View>
                <Text style={{ fontSize: 30, color: 'white' }}>Registration</Text>
                <Text style={styles.text}>Name</Text>
                <View style={styles.formInput}>
                    <Feather style={styles.icon} name="user" size={25} color="#000" />
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>{this.setState({name:value})}}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder="Name"
                        underlineColorAndroid="transparent"
                    />
                </View>

                <Text style={styles.text}>Email</Text>
                <View style={styles.formInput}>
                    <Feather style={styles.icon} name="mail" size={25} color="#000" />
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>{this.setState({email:value})}}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder="Email"
                        underlineColorAndroid="transparent"
                    />
                </View>

                <Text style={styles.text}>Address</Text>
                <View style={styles.formInput}>
                    <Feather style={styles.icon} name="home" size={25} color="#000" />
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>{this.setState({address:value})}}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholder="Address"
                        underlineColorAndroid="transparent"
                    />
                </View>

                <Text style={styles.text}>Password</Text>
                <View style={styles.formInput}>
                    <Feather style={styles.icon} name="lock" size={25} color="#000" />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        autoCapitalize='none'
                        placeholder="Password"
                        onChangeText={(value)=>{this.setState({password:value})}}
                        underlineColorAndroid="transparent"
                    />
                </View>
                
            </View>
            <View>
                <TouchableOpacity
                    style={styles.buttonSubmit}
                    onPress={()=>{this.handlerSubmit()}}
                >
                    <Text style={{ textAlign: 'center', color: '#009387' }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>Dont You Have An Account? Click Here To Sign In</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#fff',
        marginTop: 10,
    },
    icon: {
        padding: 10,
        color: '#fff'
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#fff'
    },
    text: {
        marginTop: 15,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textError: {
        marginTop: 20,
        color: '#d00000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
    textInput: {
        borderColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        marginTop: 10,
        color: 'white'
    },
    signUpForm: {
        flexGrow: 1,
        justifyContent: 'space-around',
        backgroundColor: '#009387',
        padding: 20

    },
    buttonSubmit: {
        marginTop: 15,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 4,
    },
    signInLink: {
        padding: 3,
        marginTop: 20,
        borderColor: 'white',
        textAlign: 'center',
        fontSize: 13,
        color: 'white',
    }
})

export default Register
