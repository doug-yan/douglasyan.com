import React, {Component} from 'react';
import profile from '../../resources/profile_pic.jpg';
import './header.css';

class Header extends Component {
    render() {
        return(
            <div className='header'>
                <img src={profile} className="profile-photo" alt='prof'/>
            </div>
        );
    }
};

export default Header;