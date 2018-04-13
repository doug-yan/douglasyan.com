import React, { Component } from 'react';
import './instructions.css';

class Instructions extends Component {
	render() {
		return (
			<div className='instruction-block'>
				Instructions:
				Write a program to control your robot so that he is able to find his way out of the maze!
				A list of valid commands is shown below.
			</div>
		);
	}
}

export default Instructions;