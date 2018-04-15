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
        this.getStartPos = this.getStartPos.bind(this);
        this.getEndPos = this.getEndPos.bind(this);
        this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
        this.handleWinCondition = this.handleWinCondition.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.executeInstruction = this.executeInstruction.bind(this);
        this.handleResetBoard = this.handleResetBoard.bind(this);
        
        let boardWidth = Math.floor(Math.random() * 8) + 3;
        let boardHeight = Math.floor(Math.random() * 8) + 3;
        let startPos = this.getStartPos(boardWidth, boardHeight);
        let endPos = this.getEndPos(boardWidth, boardHeight, startPos);

        this.state = {
            boardWidth: boardWidth,
            boardHeight: boardHeight,
            startPos: startPos,
            endPos: endPos,
            editorVal: [],
            solved: false
        }
    }

    getStartPos(boardWidth, boardHeight) {
        return {x: Math.floor(Math.random() * boardWidth) + 1, y: Math.floor(Math.random() * boardHeight) + 1}
    }

    getEndPos(boardWidth, boardHeight, startPos) {
        let endPos = {x: Math.floor(Math.random() * boardWidth) + 1, y: Math.floor(Math.random() * boardHeight) + 1};
        while(endPos.x === startPos.x && endPos.y === startPos.y) {
            endPos = {x: Math.floor(Math.random() * boardWidth) + 1, y: Math.floor(Math.random() * boardHeight) + 1};
        }
        return endPos
    }

    handleEditorSubmit(val) {
        let editorVal = val.split('\n');
        this.executeInstruction(editorVal);
    }

    executeInstruction(editorVal) {
        let command = editorVal.shift();
        if(command !== undefined) {
            setTimeout(() => {
                this.MazeScreen.current.executeInstruction(command);
                this.executeInstruction(editorVal);
            }, 500);
        }
    }

    handleWinCondition() {
        this.setState({solved: true});
    }

    handleReset() {
        let startPos = this.getStartPos(this.state.boardWidth, this.state.boardHeight);
        let endPos = this.getEndPos(this.state.boardWidth, this.state.boardHeight, startPos);
        this.setState({startPos, endPos});
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