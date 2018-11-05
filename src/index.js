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

    componentDidMount() {
        this.listener = (event) => {
            this.setState({
                counter: event.detail
            });
        }

        document.addEventListener(this.props.eventName, this.listener);
    }

    componentWillUnmount() {
        document.removeEventListener(this.props.eventName, this.listener);
        this.listener = null;
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
                    <MyComponent eventName="counter1-init" message="First counter: "/>
                </div>
                <div className={this.state.selectedTab !== "c2"?'hidden':''}>
                    <MyComponent eventName="counter2-init" message="Second counter: "/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TabsContainer/>, document.getElementById('root'));

setTimeout(()=>{
    let c1 = 10;
    let c2 = 5;

    document.dispatchEvent(new CustomEvent("counter1-init", {
        detail: c1
    }));
    document.dispatchEvent(new CustomEvent("counter2-init", {
        detail: c2
    }));
}, 2000);

