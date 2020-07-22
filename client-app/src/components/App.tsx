import * as React from "react";
import "./../assets/scss/App.scss";
import {Component} from "react";
import axios from 'axios';
import {Header, Icon, List} from "semantic-ui-react";


class App extends Component {
    state = {
        values: []
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/values')
            .then((resp) => {
                this.setState({
                    values: resp.data
                })
            })
    }

    render() {
        return (
            <div>
                <Header as='h2'>
                    <Icon name='users'/>
                    <Header.Content>Reactivities</Header.Content>
                </Header>
                <List>
                    {
                        this.state.values.map((value: any) =>
                            <List.Item key={value.id}>{value.name}</List.Item>
                        )}
                </List>
            </div>
        )
    } ;
}

// export default hot(module)(App);
export default App;

