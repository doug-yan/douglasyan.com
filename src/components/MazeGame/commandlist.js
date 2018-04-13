import React, { Component } from 'react';
import './commandlist.css';

class CommandList extends Component {
	render() {
		return (
			<div className='command-list'>
				<div className='command-list-title'>Command List</div>
				<div className='section-title'>Actions</div>
				<div className='section-content'>
					move, turnRight, turnLeft, dropCrumb
				</div>
				<div className='section-title'>Test</div>
				<div className='section-content'>
					wallAhead, exitAhead, crumbAhead
				</div>
				<div className='section-title'>Operations</div>
				<div className='section-content'>
					if or/and/not else, repeatNTimes, repeatWhile, repeatUntil
				</div>
			</div>
		);
	}
}

export default CommandList;