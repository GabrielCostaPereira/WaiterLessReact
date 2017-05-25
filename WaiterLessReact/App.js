/**
 * Created by pablo on 22/05/17.
 */
import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    ListView,
    TouchableHighlight,
    Alert,
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';

const url_users = "http://10.11.24.188:7777/users";

class TelaCardapio extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds.cloneWithRows(['Nenhum item encontrado.']),
            loaded: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(url_users, {method: "GET"})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(
                    {
                        dataSource: this.state.dataSource.cloneWithRows(responseJson),
                        loaded: true,
                    });
            })
            .catch((error) => {
                <Text>Não carregou.</Text>
                console.error(error);
            }).done(() => {

        });

    }


    static navigationOptions = ({navigation}) => ({
        title: 'Cardápio',
    });

    _onPressButton() {
        Alert.alert('Deu filé');
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View>
                    <Text>
                        Carregando...
                    </Text>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={ (rowData) =>
                        <TouchableHighlight onPress={() => navigate('Pedidos', {item: rowData.username })}>
                            <View style={{flex: 1}}>
                                <Text>Usuário '{rowData.username}' tem o nome '{rowData.name}'.</Text>
                            </View>
                        </TouchableHighlight>
                    }
                />
            </View>
        );
    }
}

class TelaPedidos extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Pedidos',
    });

    render() {
        let { params } = this.props.navigation.state;
        params = "ok";
        return (
            <View>
                <Text>Lista dos pedidos</Text>
                <Text>{params.item}</Text>
            </View>
        );
    }
}


const WaiterLessReact = TabNavigator({
    Cardapio: {screen: TelaCardapio},
    Pedidos: {screen: TelaPedidos},
});

WaiterLessReact.navigationOptions = {
    title: 'Waiterless',
};

AppRegistry.registerComponent('WaiterLessReact', () => WaiterLessReact);