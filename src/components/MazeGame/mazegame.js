import React, { Component } from 'react';
import MazeScreen from './mazescreen';
import DimensionsRequest from './dimensionsrequest';
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
        this.executeInstructions = this.executeInstructions.bind(this);
        this.handleResetBoard = this.handleResetBoard.bind(this);
        this.handleMazeRedo = this.handleMazeRedo.bind(this);
        this.buildIfBody = this.buildIfBody.bind(this);
        this.positiveCheckBuild = this.positiveCheckBuild.bind(this);
        this.negativeCheckBuild = this.negativeCheckBuild.bind(this);
        this.parseIfStatement = this.parseIfStatement.bind(this);
        this.buildRepeatBody = this.buildRepeatBody.bind(this);
        this.handleDimensionRequest = this.handleDimensionRequest.bind(this);

        this.state = {
            dimensionsReceieved: false,
            editorVal: [],
            solved: false,

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

    handleDimensionRequest(width, height) {
        let boardWidth = parseInt(width, 10);
        let boardHeight = parseInt(height, 10);
        if(boardWidth >= 3 && boardWidth <= 10 && boardHeight >= 3 && boardHeight <= 10) {
            let startPos = this.getStartPos(width, height);
            let endPos = this.getEndPos(width, height, startPos);
            this.setState({ boardWidth, boardHeight, startPos, endPos, dimensionsReceieved: true });
        } 
    }

    handleEditorSubmit(val) {
        let editorVal = val.split('\n');
        this.executeInstructions(editorVal);
    }

    executeInstructions(instructionList) { 
        let command = instructionList.shift();
        if(command !== undefined) {
            setTimeout(() => {
                if(command.indexOf('if') > -1) {
                    instructionList.unshift(command);
                    this.buildIfBody(instructionList);
                    clearInterval();
                }
                else if(command.indexOf('else') > -1) {
                    this.positiveCheckBuild(instructionList);
                    clearInterval();
                }
                else if(command.indexOf('repeat') > -1 ) {
                    instructionList.unshift(command);
                    this.buildRepeatBody(instructionList);
                }
                else {
                    if(this.MazeScreen.current) {
                        this.MazeScreen.current.executeInstruction(command);
                        this.executeInstructions(instructionList);
                    }
                }
            }, 250);
        }
    }

    buildRepeatBody(editorVal) {
        let repeats = editorVal.shift();
        repeats = repeats.replace ( /[^\d.]/g, '' );
        let instructionList = [];
        
        for(var i = 0; i < parseInt(repeats, 10); i++) {
            let editorDummy = editorVal.slice();
            let command = editorDummy.shift();
            while(command.indexOf(' ') < 0) {
                command = command.replace(/\s/g, '');
                instructionList.push(command);
                command = editorDummy.shift();
                if(command === undefined) { break; }
            }
        }

        let command = editorVal.shift();
        while(command.indexOf(' ') < 0) {
            command = editorVal.shift();
            if(command === undefined) { break; }
        }
        
        let newInstructions = instructionList.concat(editorVal);
        
        this.executeInstructions(newInstructions);
    }

    buildIfBody(editorVal) {
        let checkStatement = editorVal.shift();
        if(checkStatement.indexOf('or') > -1 || checkStatement.indexOf('and')  > -1 || checkStatement.indexOf('not') > -1) {
            if(this.parseIfStatement(checkStatement)) { this.positiveCheckBuild(editorVal); }
            else { this.negativeCheckBuild(editorVal); }
        }

        else {
            if(checkStatement.indexOf('wallAhead') > -1 ) {
                if(this.MazeScreen.current.detectWall()) { this.positiveCheckBuild(editorVal); }
                else { this.negativeCheckBuild(editorVal); }
            }
            if(checkStatement.indexOf('exitAhead') > -1 ) {
                if(this.MazeScreen.current.detectExit()) { this.positiveCheckBuild(editorVal); }
                else { this.negativeCheckBuild(editorVal); }
            }
            if(checkStatement.indexOf('crumbAhead') > -1 ) {
                if(this.MazeScreen.current.detectCrumb()) { this.positiveCheckBuild(editorVal); }
                else { this.negativeCheckBuild(editorVal); }
            }
        }
    }

    parseIfStatement(statement) {
        let wall = false, exit = false, crumb = false;
        let wallFound = false, exitFound = false, crumbFound = false;
        if(statement.indexOf('wallAhead') > -1) { wall = this.MazeScreen.current.detectWall(); wallFound = true; }
        if(statement.indexOf('exitAhead') > -1) { exit = this.MazeScreen.current.detectExit(); exitFound = true; }
        if(statement.indexOf('crumbAhead') > -1) { crumb = this.MazeScreen.current.detectCrumb(); crumbFound = true;}

        if(statement.indexOf('not') > -1) {
            if(statement.indexOf('wallAhead') > -1) { return !wall; }
            if(statement.indexOf('exitAhead') > -1) { return !exit; }
            if(statement.indexOf('crumbAhead') > -1) { return !crumb; }
        }

        if(statement.indexOf('or') > -1) {
            if(wallFound) {
                if(exitFound) { return (wall || exit); }
                if(crumbFound) { return (wall || crumb); }
                else { return wall; }
            }
            if(exitFound) {
                if(wallFound) { return (exit || wall); }
                if(crumbFound) { return (exit || crumb); }
                else { return exit; }
            }
            if(crumbFound) {
                if(wallFound) { return (crumb || wall); }
                if(exitFound) { return (crumb || exit); }
                else { return crumb; }
            }
        }

        if(statement.indexOf('and') > -1) {
            if(wallFound) {
                if(exitFound) { return (wall && exit); }
                if(crumbFound) { return (wall && crumb); }
                else { return wall; }
            }
            if(exitFound) {
                if(wallFound) { return (exit && wall); }
                if(crumbFound) { return (exit && crumb); }
                else { return exit; }
            }
            if(crumbFound) {
                if(wallFound) { return (crumb && wall); }
                if(exitFound) { return (crumb && exit); }
                else { return crumb; }
            }
        }
    }

    positiveCheckBuild(editorVal) {
        let instructionList = [];
        let command = editorVal.shift();

        while(command.indexOf(' ') < 0) {
            command = command.replace(/\s/g, '');
            instructionList.push(command);
            command = editorVal.shift();
            if(command === undefined) { break; }   
        }

        let newInstructions = instructionList.concat(editorVal);
        this.executeInstructions(newInstructions);
    }

    negativeCheckBuild(editorVal) {
        let dummy = editorVal.shift();
        while(dummy.indexOf(' ') < 0) {
            dummy = editorVal.shift();
            if(dummy === undefined) { break; }
        }
        this.executeInstructions(editorVal);
    }

    handleWinCondition() {
        this.setState({solved: true, dimensionsReceieved: false});
    }

    handleReset() {
        let startPos = this.getStartPos(this.state.boardWidth, this.state.boardHeight);
        let endPos = this.getEndPos(this.state.boardWidth, this.state.boardHeight, startPos);
        this.setState({startPos, endPos});
        this.setState({solved: false});
    }

    handleMazeRedo() {
        this.setState({dimensionsReceieved: false});
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
                            { this.state.dimensionsReceieved ?
                            (
                                <MazeScreen
                                    ref={this.MazeScreen}
                                    start_position={this.state.startPos}
                                    end_position={this.state.endPos}
                                    width={this.state.boardWidth}
                                    height={this.state.boardHeight}
                                    trigger_win={this.handleWinCondition}
                                    hit_wall={this.handleWallCollision}
                                    reset={this.handleMazeRedo}
                                />
                            ):
                            (
                                <DimensionsRequest
                                    submit_request={this.handleDimensionRequest}
                                />
                            )
                            }
                        </div>
                    )
                    }
                </div>
            </div>
		);
	}	
}

export default MazeGame;