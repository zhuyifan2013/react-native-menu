'use strict';

const React = require('react-native');
const {
  StyleSheet,
  Text,
  View
  } = React;

import Menu, {
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-menu';

const Example = React.createClass({
  componentDidMount() {
    // We can use the public context API to open/close/toggle the menu.
    //setInterval(() => {
    //  this.refs.MenuContext.toggleMenu('menu1');
    //}, 2000);
  },
  getInitialState() {
    return {
      message: 'Try clicking the top-right menus',
      firstMenuDisabled: false,
      dropdownSelection: '-- Choose --'
    };
  },
  setMessage(value) {
    if (typeof value === 'string') {
      this.setState({ message: `You selected "${value}"` });
    } else {
      this.setState({ message: `Woah!\n\nYou selected an object:\n\n${JSON.stringify(value)}` });
    }
    return value !== 'do not close';
  },
  setFirstMenuDisabled(disabled) {
    this.setState({
      message: `First menu is ${disabled ? 'disabled' : 'enabled'}`,
      firstMenuDisabled: disabled
    });
  },
  render() {
    return (
      <MenuContext style={{ flex: 1 }} ref="MenuContext">
        <View style={styles.topbar}>
          <View style={styles.title}>
            <Text style={styles.titleText}>First menu...</Text>
          </View>
          <Menu name ="menu1" onSelect={this.setMessage}>
            <MenuTrigger disabled={this.state.firstMenuDisabled} style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption value="normal">
                <Text>Normal option</Text>
              </MenuOption>
              <MenuOption value="do not close">
                <Text>Does not close menu</Text>
              </MenuOption>
              <MenuOption value="disabled" disabled={true}>
                <Text style={styles.disabled}>Disabled option</Text>
              </MenuOption>
              <View style={styles.divider}/>
              <MenuOption value={{ message: 'Hello World!' }}>
                <Text>Option with object value</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={[styles.topbar, { backgroundColor: '#333' }]}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Second menu...</Text>
          </View>
          <Menu name="menu2" onSelect={this.setFirstMenuDisabled}>
            <MenuTrigger style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>&#8942;</Text>
            </MenuTrigger>
            <MenuOptions>
              {
                this.state.firstMenuDisabled
                  ? (
                    <MenuOption value={false}>
                      <Text>enable first menu</Text>
                    </MenuOption>
                  )
                  : (
                  <MenuOption value={true}>
                    <Text>disable first menu</Text>
                  </MenuOption>
                )
              }
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            { this.state.message }
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            You can also make it a dropdown
          </Text>
          <Menu style={styles.dropdown} onSelect={(value) => this.setState({ dropdownSelection: value })}>
            <MenuTrigger>
              <Text>{this.state.dropdownSelection}</Text>
            </MenuTrigger>
            <MenuOptions style={styles.dropdownOptions}>
              <MenuOption value="Option One">
                <Text>Option One</Text>
              </MenuOption>
              <MenuOption value="Option Two">
                <Text>Option Two</Text>
              </MenuOption>
              <MenuOption value="Option Three">
                <Text>Option Three</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </MenuContext>
    );
  }
});

const styles = StyleSheet.create({
  topbar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  title: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 5
  },
  titleText: {
    color: '#ddd',
    fontSize: 20
  },
  menuTrigger: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  menuTriggerText: {
    color: 'lightgrey',
    fontWeight: '600',
    fontSize: 20
  },
  disabled: {
    color: '#ccc'
  },
  divider: {
    marginVertical: 5,
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  contentText: {
    fontSize: 18
  },
  dropdown: {
    width: 200,
    borderColor: '#999',
    borderWidth: 1,
    padding: 5
  },
  dropdownOptions: {
    width: 200
  }
});

module.exports = Example;
