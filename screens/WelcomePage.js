import {Text, View , TouchableOpacity, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Ellipse} from 'react-native-svg';
import styles from '../styles/WelcomePageStyle'

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
