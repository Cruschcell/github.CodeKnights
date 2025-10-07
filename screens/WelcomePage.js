import { StyleSheet, Text, View , TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Ellipse} from 'react-native-svg';

const{width} = Dimensions.get("window");

const HandleGetStarted = () => {
    console.log('Registration test');
};

const handleLogin = () => {
    console.log('Login test');
};

export default function WelcomePage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>          
    <StatusBar barStyle="dark-content"/>

        <View style={styles.topPart}>
            <Text style={styles.topText}>Welcome to Letran's CodeKnight</Text>
        </View>

        <View style={styles.bottomPart}>
            <View style={styles.curve}>
                <Svg height="200" width={width} style={styles.svg}>
                    <Ellipse cx={width/2} cy="100" rx={width*0.98} ry="100" fill="#C8102E"/>
                    <Ellipse cx={width/2} cy="113" rx={width*0.95} ry="100" fill="#00205B"/>
                </Svg>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={HandleGetStarted}
                activeOpacity={0.8}>
                    <Text style={styles.registerText} onPress={()=>navigation.navigate('Registration')}>Click here to get started →</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Already have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
    },
    topPart:{
        flex:1,
        backgroundColor:"#fff",
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:20,
        alignItems:'center',
    },
    topText:{
        fontSize: 35,
        color:"#000",
        textAlign:'center',
        fontWeight:'bold',
        fontFamily: 'Jaldi Bold', //aint working for some reason, fuck this shit
    },
    bottomPart:{
        flex:1,
        backgroundColor: "#00205B",
        position:'relative',
        marginBottom:-40,
    },
    curve:{
        position:'absolute',
        top: -20,
        left:0,
        right:0,
        height:200,
    },
    svg:{
        position:'absolute',
        top:0,
        left:0.5,
    },
    buttonsContainer:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:120,
        paddingBottom:40,
        paddingHorizontal:20,
    },
    registerButton:{
        backgroundColor:"#fff",
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset:{
            width:5,
            height:5
        },
        shadowOpacity:0.2,
        shadowRadius:10,
        elevation:10,
    },
    registerText:{
        color:"#00205B",
        fontSize:20,
        fontWeight:'600',
    },
    loginButton:{
        paddingVertical:10,
    },
    loginText:{
        color:"#fff",
        fontSize: 15,
        textDecorationLine:"underline",
        bottom:50,
    }
})