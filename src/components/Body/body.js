import React, {Component} from 'react';
import './body.css';
import ExternalLinks from '../ExternalLinks/external_links';

class Body extends Component {
	render() {
		return (
			<div className='body'>
				<div className='name'>Douglas Yan</div>
				<div className='titles'>Software Engineer</div>
				<ExternalLinks />
			</div>
		);
	}
}

export default Body;