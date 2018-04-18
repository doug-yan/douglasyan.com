import React, { Component } from 'react';
import './commandlist.css';

class CommandList extends Component {
	render() {
		return (
			<div className='command-list'>
				<div className='command-list-title'>Command List</div>
				<div className='section-title'>Actions</div>
				<div className='section-content'>
					<li>move</li>
					<li>turnRight</li>
					<li>turnLeft</li>
					<li>dropCrumb</li>
				</div>
				<div className='section-title'>Test</div>
				<div className='section-content'>
					<li>wallAhead</li>
					<li>exitAhead</li>
					<li>crumbAhead</li>
				</div>
				<div className='section-title'>Operations</div>
				<div className='section-content'>
					<li>if or/and/not else</li>
					<li>repeatNTimes</li>
				</div>
			</div>
		);
	}
}

export default CommandList;