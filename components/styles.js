import styled from 'styled-components'
import {View, Text, Image} from 'react-native'
import Constants from 'expo-constants'

const StatusBarHeight = Constants.statusBarHeight;


export const Colors = {
    primary: "#ffffff",
    secondary: "abcdef",
    tertiary: "cbadef"
}

const {primary, secondary, tertiary} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 30}px;
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
`

export const Logger = styled.View`
    width: 95%;
    height: auto;
    margin-top: ${StatusBarHeight + 30}px;
    align-items: center;
`

export const Macros = styled.View`
    width: 95%;
    height: auto;
    margin-top: ${StatusBarHeight + 30}px;
    align-items: center;
`