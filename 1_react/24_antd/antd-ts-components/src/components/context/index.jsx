import * as React from "react";
export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);

import { ThemeContext } from "./theme-context";

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} style={{ backgroundColor: theme.background }} />;
  }
}

ThemedButton.contextType = ThemeContext;

function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

export default MyClass;
