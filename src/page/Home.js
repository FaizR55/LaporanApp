import React, { Component } from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

export class Home extends Component {
    render() {
        return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/laporan.png")} />
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}} style={styles.buttonSubmit}>
                <Text style={{ textAlign: 'center', color: '#009387' }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Register')}} style={styles.buttonSubmit}>
                <Text style={{ textAlign: 'center', color: '#009387' }}>Register</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const mapStateToProps = (state) => ({
    isLogin:state.LoginReducer.isLogin    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 135,
        width: 245,
        resizeMode: 'contain',
        marginBottom: 10
    },
    buttonSubmit: {
        marginTop: 15,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 4,
        width: '100%'
    }
})

