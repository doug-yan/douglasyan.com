import React, { Component } from 'react';
import './mazescreen.css';

class MazeScreen extends Component {
	constructor(props) {
		super(props);
		this.boardBuilder = this.boardBuilder.bind(this);
		this.moveRight = this.moveRight.bind(this);
		this.moveLeft = this.moveLeft.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);

		let temp_list = [];
		for(var i = 0; i < props.width * props.height; i++) {
			temp_list.push('grey');
		}

		let end_linear_position = ((props.end_position.y - 1 ) * props.width + props.end_position.x) - 1
		temp_list[end_linear_position] = 'red'

		let start_linear_position = ((props.start_position.y - 1) * props.width + props.start_position.x) - 1
		temp_list[start_linear_position] = 'green'

		this.state = {
			prevStart: start_linear_position,
			colorList: temp_list,
			endLinearPosition: end_linear_position,
			totalSize: this.props.height * this.props.width
		};
	}

	componentDidMount() {
		console.log('This is the start coordinates: ' + this.state.prevStart)
	}

	componentDidUpdate() {
		if (this.state.prevStart === this.state.endLinearPosition) {
				this.props.trigger_win();
		}
	}

	moveRight() {
		if(this.state.prevStart < (this.props.width * this.props.height) - 1) {
			let rightWallMax = (Math.floor(this.state.prevStart / this.props.height) + 1) * this.props.width - 1;
			if(this.state.prevStart === rightWallMax) {
				this.props.hit_wall();
			}

			else {
				let colors = [...this.state.colorList];
				colors[this.state.prevStart] = 'grey';
				colors[this.state.prevStart + 1] = 'green';
				this.setState({prevStart: this.state.prevStart + 1});
				this.setState({colorList: colors});
			}
		}
	}

	moveLeft() {
		if(this.state.prevStart > 0) {
			let colors = [...this.state.colorList];
			colors[this.state.prevStart] = 'grey';
			colors[this.state.prevStart - 1] = 'green';
			this.setState({prevStart: this.state.prevStart - 1});
			this.setState({colorList: colors});
		}
	}

	moveUp() {
		console.log('move up');
	}

	moveDown() {
		console.log('move down');
	}

	boardBuilder() {
		return (
			<div>
				<section>
					{this.state.colorList.map(color => {
						return(<div style={{backgroundColor: color}}></div>);
					})}
				</section>
				<button onClick={this.moveLeft} className='button'>Left</button>
				<button onClick={this.moveRight} className='button'>Right</button>
				<button onClick={this.moveUp} className='button'>Up</button>
				<button onClick={this.moveDown} className='button'>Down</button>
			</div>
		);
	}

	render() {
		return (
			<div className='maze-screen'>
				{this.boardBuilder()}
			</div>
		);
	}
}

export default MazeScreen;