import React from 'react';
import { Text, ScrollView, ImageBackground, Dimensions, View} from 'react-native';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles'

/*
const Login = () => {
    return (
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/logo3.png')}></PageLogo>
                    
            </InnerContainer>
        </StyledContainer>
    );
}
*/

const Login = ({navigation}) => {

    return (
        <ScrollView 
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}>
            <ImageBackground
            source={require('./../assets/background.jpg')}
            style={{
                height: Dimensions.get('window').height / 2.5,
            }}>
            
            <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/logo3.png')}></PageLogo>
                    
            </InnerContainer>
        </StyledContainer>
            </ImageBackground>
        </ScrollView>
    );

}


export default Login;