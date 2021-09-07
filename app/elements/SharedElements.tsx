import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import useStyle from '../hooks/useStyle';
import {Container} from './Styles';

type CustomViewProps = {
  style?: TextStyle | TextStyle[];
};

type ContextType = {
  x: number;
  y: number;
};

const DragableView: React.FC<CustomViewProps> = ({children, style}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
    },
    onEnd: () => {
      x.value = withSpring(0);
      y.value = withSpring(0);
    },
  });
  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
      ],
    };
  }, [x, y]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          panStyle,
          style,
        ]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const SafeView: React.FC<CustomViewProps> = ({children, style}) => {
  const {color} = useStyle();
  return (
    <Animated.View
      style={[Container.flexContainer, {backgroundColor: color.main}, style]}>
      {children}
    </Animated.View>
  );
};

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  color?: string;
  fontSize?: number;
  title?: boolean;
  fontFamily?: string;
  center?: boolean;
  bold?: boolean;
  textAlign?: any;
  fontWeight?: any;
}

const MyText: React.FC<CustomTextProps> = ({
  children,
  title,
  fontSize,
  style,
  center,
  textAlign,
  bold,
  fontWeight,
  color: textColor,
  fontFamily,
}) => {
  const {color} = useStyle();
  return (
    <Text
      style={[
        {
          color: textColor ? textColor : color.textColor,
          fontSize: fontSize ? fontSize : title ? 32 : 18,
          textAlign: center ? 'center' : textAlign,
          fontWeight: bold ? 'bold' : fontWeight,
          fontFamily: fontFamily
            ? fontFamily
            : title
            ? 'Recursive-Regular'
            : 'Recursive-SemiBold',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export {DragableView, SafeView, MyText};
