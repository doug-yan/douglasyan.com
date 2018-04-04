import React, {Component} from 'react';
import './home.css';
import Header from '../Header/header';
import Body from '../Body/body';

class Home extends Component {
    render() {
        return(
            <div className="home">
                <Header />
                <Body />
            </div>
        );
    }
}

export default Home; 