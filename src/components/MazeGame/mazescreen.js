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
		this.parseCommands = this.parseCommands.bind(this);

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
			totalSize: this.props.height * this.props.width,
			heightSize: 0.85*(400/this.props.height),
			widthSize: `${100/this.props.width - 2}%`,
			orientation: 'top'
		};
	}

	componentDidUpdate() {
		if (this.state.prevStart === this.state.endLinearPosition) {
			setTimeout(()=>{this.props.trigger_win()}, 500);	
		}
		if (this.props.command_list !== '') {
			this.parseCommands();
		}
	}

	parseCommands() {
		let command = this.props.get_next_command();

		while(command !== undefined) {
			switch(command) {
				case 'moveRight':
					this.moveRight();
				break;

				case 'moveDown':
					this.moveDown();
				break;
				default:
				break;
			}
			command = this.props.get_next_command();
		}
	}

	moveRight() {
		if(this.state.prevStart < (this.props.width * this.props.height) - 1) {
			let rightWallMax = (Math.floor(this.state.prevStart / this.props.height) + 1) * this.props.width - 1;
			if(this.state.prevStart === rightWallMax) {
				// this.props.hit_wall();
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
			let leftWallMin = Math.floor(this.state.prevStart / this.props.height) * this.props.width;
			if(this.state.prevStart === leftWallMin) {
				// this.props.hit_wall();
			}

			else {
				let colors = [...this.state.colorList];
				colors[this.state.prevStart] = 'grey';
				colors[this.state.prevStart - 1] = 'green';
				this.setState({prevStart: this.state.prevStart - 1});
				this.setState({colorList: colors});
			}
		}
	}

	moveUp() {
		// let upperWallMin = Math.floor(this.state.prevStart / this.props.height) * this.props.width - 1;
		let currentRow = Math.floor(this.state.prevStart / this.props.height)

		if(currentRow > 0) {
			let colors = [...this.state.colorList];
			colors[this.state.prevStart] = 'grey';
			colors[this.state.prevStart - this.props.width] = 'green';
			this.setState({prevStart: this.state.prevStart - this.props.width});
			this.setState({colorList: colors})
		}
		else {
			// this.props.hit_wall();
		}
	}

	moveDown() {
		let currentRow = Math.floor(this.state.prevStart / this.props.height);

		if(currentRow < this.props.height - 1) {
			let colors = [...this.state.colorList];
			colors[this.state.prevStart] = 'grey';
			colors[this.state.prevStart + this.props.width] = 'green';
			this.setState({prevStart: this.state.prevStart + this.props.width});
			this.setState({colorList: colors})
		}
		else {
			// this.props.hit_wall();
		}
	}

	boardBuilder() {
		return (
			<div>
				<section>
					{this.state.colorList.map((color, index) => {
						return(
							<div
								key={index}
								style={{backgroundColor: color, height: this.state.heightSize, width: this.state.widthSize}}
								className='square'
							/>);
					})}
				</section>
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