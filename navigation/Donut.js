import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import Svg, { G, Circle, Rect } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native'

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 2000,
  color = "tomato",
  delay = 0,
  textColor,
  max = 100,
  calorie = false,
  dataLabel = "easter egg :D"
}) {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;


  const isFocused = useIsFocused()
  const [over100, setover100] = useState(false);

  //console.log(isFocused);

  //let over100 = false;
  
  const animation = (toValue) => {
    let num = 0;
    if (!isFocused) {
        num = 1;
    }
    return Animated.timing(animated, {
      delay: 500,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
        //animation(isFocused);
        //animation(num === 0 ? percentage : 0);
        //animation(percentage);
    });
  };

  React.useEffect(() => {
    if (!isFocused) {
        duration = 0;
        animation(0);
    }
    else {
        duration = 1000;
        animation(percentage);
    }
    animated.addListener((v) => {
      let maxPerc = 100 * v.value / max;
      if (maxPerc > 100) {
        setover100(true);
        maxPerc = 100;
        let text2 = Math.round(v.value) + " g";
        if (calorie) {
            text2 = String(Math.round(v.value));
            //text2 = text2 + "/" + maxPerc;
        }
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: text2,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      }
      else {
        setover100(false);
        let text2 = Math.round(v.value) + " g";
        if (calorie) {
            text2 = String(Math.round(v.value));
        }
        const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: text2,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });

  console.log(isFocused);
  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2.5, color: textColor ?? color },
          styles.text,
        ]}
      />
      {/* <Text style={{textAlign:'center', color: color, textShadowColor: 'black', textShadowRadius: 0.5}}>{dataLabel}</Text> */}
      <Text style={{textAlign:'center', color: color, fontWeight: '900'}}> {dataLabel} {over100 && '⚠️'}</Text>
      {/* <Text style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2.5, color: textColor ?? color },
          styles.text,
        ]}>{dataLabel}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});