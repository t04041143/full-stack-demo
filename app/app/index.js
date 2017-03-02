import React, {Component} from "react";
import {StyleSheet, ScrollView} from "react-native";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";
import Home from "./components/pages/home";
import Login from "./components/pages/login";

class App extends Component {
    render() {
        return (
            <ScrollableTabView
                style={{marginTop: 20 }}
                renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
            >
                <ScrollView tabLabel='首页' style={styles.tabView}>
                    <Home/>
                </ScrollView>
                <ScrollView tabLabel='登录' style={styles.tabView}>
                    <Login/>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)'
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3
    }
});

export default App;