import React, { Component } from 'react';
import MazeScreen from './mazescreen';
import Instructions from './instructions';
import CommandList from './commandlist';
import Editor from './editor';
import './mazegame.css';

class MazeGame extends Component {
    constructor(props) {
        super(props);
        this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
        this.handleWinCondition = this.handleWinCondition.bind(this);
        this.handleWallCollision = this.handleWallCollision.bind(this);
        this.state = {
            startPos: {x: 2, y: 2},
            endPos: {x: 4, y: 3},
            boardWidth: 4,
            boardHeight: 4,
            editorVal: ''
        }
    }

    handleEditorSubmit(val) {
        console.log(val)
    }

    handleWinCondition() {
        console.log('You win!');
    }

    handleWallCollision() {
        console.log('Hit a wall');
    }

	render() {
		return(
			<div className='page-container'>
                <div className='title'> Robot Maze Game </div>
                <div className='maze-body'> 
                    <MazeScreen
                        start_position={this.state.startPos}
                        end_position={this.state.endPos}
                        width={this.state.boardWidth}
                        height={this.state.boardHeight}
                        trigger_win={this.handleWinCondition}
                        hit_wall={this.handleWallCollision}
                    />
                    <div className='body-right'>
                        <Instructions />
                        <div className='command-list-and-editor'>
                            <CommandList />
                            <Editor text_value={this.state.editorVal} submit={this.handleEditorSubmit} />
                        </div>
                    </div>
                </div>
            </div>
		);
	}	
}

export default MazeGame;