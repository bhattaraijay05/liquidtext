import colors from '@constants/colors';
import React, {createContext, useState} from 'react';
import Animated from 'react-native-reanimated';

export const ThemeContext = createContext({
  theme: '',
  toggleTheme: () => {},
  settheme: (theme: string) => {},
});

const ThemeContextProvider = (props: any) => {
  const [theme, setTheme] = useState(colors.lightTheme);
  const toggleTheme = () => {
    theme === colors.lightTheme
      ? setTheme(colors.darkTheme)
      : setTheme(colors.lightTheme);
  };

  const settheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, settheme}}>
      <Animated.View
        style={[
          {
            flex: 1,
            backgroundColor: theme,
          },
        ]}>
        {props.children}
      </Animated.View>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
