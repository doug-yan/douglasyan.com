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
        this.handleReset = this.handleReset.bind(this);
        this.getNextCommand = this.getNextCommand.bind(this);
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
        this.setState({editorVal});
    }

    handleWinCondition() {
        this.setState({solved: true});
    }

    handleReset() {
        this.setState({solved: false});
    }

    getNextCommand() {
        let nextCommand = this.state.editorVal[0];
        let newEditorVal = this.state.editorVal;
        newEditorVal.shift()
        this.setState({editorVal: newEditorVal})
        return nextCommand;
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
                                start_position={this.state.startPos}
                                end_position={this.state.endPos}
                                width={this.state.boardWidth}
                                height={this.state.boardHeight}
                                trigger_win={this.handleWinCondition}
                                hit_wall={this.handleWallCollision}
                                command_list={this.state.editorVal}
                                get_next_command={this.getNextCommand}
                            />
                            <div className='body-right'>
                                <Instructions />
                                <div className='command-list-and-editor'>
                                    <CommandList />
                                    <Editor text_value={this.state.editorVal} submit={this.handleEditorSubmit} />
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