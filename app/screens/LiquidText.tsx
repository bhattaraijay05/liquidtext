import {ThemeContext} from '@context/ThemeContext';
import {MyText, SafeView} from '@elements/SharedElements';
import useStyle from '@hooks/useStyle';
import MaskedView from '@react-native-community/masked-view';
import React from 'react';
import {Button, Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Text} from 'react-native-svg';
import Liquid from './Liquid';

const {width, height} = Dimensions.get('window');

const LiquidText = () => {
  const {toggleTheme} = React.useContext(ThemeContext);
  const {color} = useStyle();
  return (
    <SafeView>
      <MaskedView
        style={{
          flex: 1,
          flexDirection: 'row',
          height: '100%',
          backgroundColor: color.inverse,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Svg height={height} width={width}>
              <Text
                fill="black"
                fontSize="60"
                fontWeight="bold"
                x={width / 2}
                y={height / 2}
                textAnchor="middle">
                STROKED TEXT
              </Text>
            </Svg>
          </View>
        }>
        <Liquid />
      </MaskedView>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </SafeView>
  );
};

export default LiquidText;

const styles = StyleSheet.create({});
