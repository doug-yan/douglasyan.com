import React, {Component} from 'react';
import Facebook from '../../lib/assets/facebook.png';
import LinkedIn from '../../lib/assets/linkedin.png';
import Github from '../../lib/assets/github.png';
import './external_links.css';

class ExternalLinks extends Component {
	render() {
		return (
			<div className='link-container'>
				<a href='https://www.facebook.com/douglas.yan.54'><img src={Facebook} className='facebook' alt='facebook'/></a>
				<a href='https://www.linkedin.com/in/douglas-yan-48790288'><img src={LinkedIn} className='linkedin' alt='linkedin'/></a>
				<a href='https://github.com/doug-yan'><img src={Github} className='github' alt='github'/></a>
			</div>
		);
	}
}

export default ExternalLinks;