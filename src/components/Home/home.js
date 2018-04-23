import React, {Component} from 'react';
// import {Route, Link} from 'react-router-dom';
import './home.css';
import Body from '../Body/body';
// import MazeGame from '../MazeGame/mazegame';

class Home extends Component {
    render() {
        return(
            <div className='opaque-layer'>
                <div className="home">
                    <Body />
                </div>
            </div>
        );
    }
}

export default Home; 

/*
<nav>
    <Link to="/MazeGame">LINK</Link>
</nav>
<div>
    <Route path='/MazeGame' component={MazeGame}/>
</div>
*/