import React, { Component } from 'react';
import MazeScreen from './mazescreen';
import Instructions from './instructions';
import CommandList from './commandlist';
import Editor from './editor';
import './mazegame.css';

class MazeGame extends Component {
    constructor(props) {
        super(props);
        this.MazeScreen = React.createRef();
        this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
        this.handleWinCondition = this.handleWinCondition.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.callMovement = this.callMovement.bind(this);
        this.handleResetBoard = this.handleResetBoard.bind(this);
        
        this.state = {
            startPos: {x: 2, y: 2},
            endPos: {x: 4, y: 3},
            boardWidth: 4,
            boardHeight: 6,
            editorVal: [],
            solved: false
        }
    }

    handleEditorSubmit(val) {
        let editorVal = val.split('\n');
        this.callMovement(editorVal);
    }

    callMovement(editorVal) {
        let command = editorVal.shift();
        if(command !== undefined) {
            setTimeout(() => {
                this.MazeScreen.current.parseCommand(command);
                this.callMovement(editorVal);
            }, 500);
        }
    }

    handleWinCondition() {
        this.setState({solved: true});
    }

    handleReset() {
        this.setState({solved: false});
    }

    handleResetBoard() {
        this.MazeScreen.current.resetMaze();
    }

	render() {
		return(
			<div className='page-container'>
                <div className='title'> Robot Maze Game </div>
                <div>
                    { this.state.solved ? 
                    (
                        <div className='win-container'>
                            <div className='win-screen'>You win!</div>
                            <button onClick={this.handleReset} className='button'>Play Again</button>
                        </div>
                    ):
                    (
                        <div  className='maze-body'>
                            <MazeScreen
                                ref={this.MazeScreen}
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
                                    <Editor
                                        text_value={this.state.editorVal}
                                        submit={this.handleEditorSubmit}
                                        reset={this.handleResetBoard}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
		);
	}	
}

export default MazeGame;