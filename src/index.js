import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }

    increaseCounter = ()=>{
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return <span onClick={this.increaseCounter}>{this.props.message}{this.state.counter}</span>;
    }

}

class TabsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "c1"
        }
    }

    changeTab = (event, value)=> {
        this.setState({
            selectedTab:value
        });
    }

    render() {
        return (
            <div>
                <Tabs value={this.state.selectedTab} onChange={this.changeTab}>
                    <Tab label="Counter 1" value="c1"/>
                    <Tab label="Counter 2" value="c2"/>
                </Tabs>
                <div className={this.state.selectedTab !== "c1"?'hidden':''}>
                    <MyComponent message="First counter: "/>
                </div>
                <div className={this.state.selectedTab !== "c2"?'hidden':''}>
                    <MyComponent message="Second counter: "/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TabsContainer/>, document.getElementById('root'));
