import React, { Component } from 'react';
import './dimensionsrequest.css';

class MazeScreen extends Component {
    constructor(props) {
        super(props);
        this.handleWidthChange = this.handleWidthChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);

        this.state = {
            width: '',
            height: ''
        }
    }

    handleWidthChange(e) {
        this.setState({ width: e.target.value })
    }

    handleHeightChange(e) {
        this.setState({ height: e.target.value })
    }

    render() {
        return (
            <div className='dimensions-request'>
                <div className='dimensions-title'>
                    Enter Board Dimensions
                </div>
                <div className='input-field'>
                    <div className='input-description'>Enter Width (min: 3, max: 10):</div>
                    <textarea className='width-field' value={this.state.width} onChange={this.handleWidthChange}/>
                </div>
                <div className='input-field'>
                    <div className='input-description'>Enter Height (min: 3, max: 10):</div>
                    <textarea className='height-field' vlaue={this.state.height} onChange={this.handleHeightChange}/>
                </div>
                <div className='dimension-button'>
                    <button onClick={()=> {this.props.submit_request(this.state.width, this.state.height)}} className='button'>Submit Dimensions</button>
                </div>
            </div>
        );
    }
}

export default MazeScreen;