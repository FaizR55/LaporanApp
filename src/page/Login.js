import React, { Component } from 'react'
import axios from 'axios';
import { ScrollView, Text, Image, TextInput, StyleSheet, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { LoginAction } from '../Redux/Action'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            password:"",
        }
    }

    loginHandler(){
        console.log(this.state)
        axios.get('http://192.168.100.5:8080/user/login/',{
            params:{
                name:this.state.name,
                password:this.state.password,
            }
        })
        .then((response)=>{
            let data=response.data;
            if(data !== ""){
                this.props.LoginAction(true,"isLogin")
                this.props.LoginAction(data,"dataUser")
                alert("Login berhasil")
                this.props.navigation.navigate('MainMenu')
            }else{
                alert("Login gagal")
                this.props.LoginAction(false,"isLogin")
            }
        })
    }


    render() {
        return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={{ alignItems: 'center' }}>
                <Image style={styles.image} source={require('../../assets/laporan.png')} />
            </View>
            <View>
                <Text style={styles.text}>Username</Text>
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
                <TouchableOpacity onPress={()=>{this.loginHandler()}} style={styles.buttonSubmit}>
                    <Text style={{ textAlign: 'center', color: '#009387' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.signUpLink} onPress={()=>{this.props.navigation.navigate('Register')}}>Dont Have Account? Click here to sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
        )
    }
}

const mapStateToProps = (state) => ({
    dataMapping:state.LoginReducer
})

const mapDispatchToProps = {
    LoginAction   
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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
    container: {
        padding: 20,
        flexGrow: 4,
        justifyContent: 'space-around',
        backgroundColor: '#009387'
    },
    text: {
        marginTop: 15,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonSubmit: {
        marginTop: 25,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 4,
    },
    signUpLink: {
        padding: 3,
        marginTop: 20,
        borderColor: 'white',
        textAlign: 'center',
        fontSize: 13,
        color: 'white',
    },
    image: {
        height: 135,
        width: 245,
        resizeMode: 'contain',
    }
})
