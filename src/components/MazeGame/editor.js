import React, { Component } from 'react';
import './editor.css';

class Editor extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			textField: ''
		}
	}

	handleChange(e) {
		this.setState({ textField: e.target.value });
	}

	handleClear(e) {
		this.setState({ textField: '' });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.submit(this.state.textField);
	}

	handleKeyDown(e) {
		if(e.keyCode===9 || e.which===9){
            e.preventDefault();
            let newTextField = this.state.textField + '\t';
            this.setState({textField: newTextField});
        }
	}

	render() {
		return (
			<div>
				<div onSubmit={this.handleSubmit}>
					<textarea
						className='text-editor'
						value={this.state.textField}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
						tabIndex="0"
					/>
				</div>
				<div className='editor-buttons'>
					<button onClick={this.handleSubmit} className='button'>Submit</button>
					<button onClick={this.handleClear} className='button'>Clear</button>
					<button onClick={this.props.reset} className='button'>Reset</button>
				</div>
			</div>
		);
	}
}

export default Editor;