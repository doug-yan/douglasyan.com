import React, { Component } from 'react';
import robot from './assets/robot.png';
import exit from './assets/exit.png';
import crumb from './assets/crumb.png';
import './mazescreen.css';

class MazeScreen extends Component {
    constructor(props) {
        super(props);
        this.boardBuilder = this.boardBuilder.bind(this);
        this.executeInstruction = this.executeInstruction.bind(this);
        this.executeMovement = this.executeMovement.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
        this.dropCrumb = this.dropCrumb.bind(this);
        this.detectWall = this.detectWall.bind(this);
        this.detectExit = this.detectExit.bind(this);
        this.detectCrumb = this.detectCrumb.bind(this);
        this.getRobot = this.getRobot.bind(this);

        let temp_list = [];
        for(var i = 0; i < props.width * props.height; i++) {
            temp_list.push('grey');
        }

        let end_linear_position = ((this.props.start_position.y - 1) * this.props.width + this.props.start_position.x) - 1;
        temp_list[end_linear_position] = 'red';

        let start_linear_position = ((this.props.end_position.y - 1 ) * this.props.width + this.props.end_position.x) - 1;
        temp_list[start_linear_position] = 'green'

        this.state = {
            originalStart: start_linear_position,
            originalColorList: temp_list,
            prevStart: start_linear_position,
            colorList: temp_list,
            endLinearPosition: end_linear_position,
            totalSize: this.props.height * this.props.width,
            heightSize: 0.85*(400/this.props.height),
            widthSize: `${100/this.props.width - 2}%`,
            orientation: 'u',
            orientationMap:['l', 'u', 'r', 'd'],
            crumbPos: []
        };
    }

    componentDidUpdate() {
        if (this.state.prevStart === this.state.endLinearPosition) {
            setTimeout(()=>{this.props.trigger_win()}, 250);    
        }
    }

    resetMaze() {
        this.setState({prevStart: this.state.originalStart, colorList: this.state.originalColorList, orientation: 'u', crumbPos: []});
    }

    executeInstruction(instruction) {
        switch(instruction) {
            case 'move':
                this.executeMovement();
                break;
            case 'dropCrumb':
                this.dropCrumb();
                break;
            case 'turnLeft':
            case 'turnRight':
                this.changeOrientation(instruction);
                break;
            case 'wallAhead':
                if(this.detectWall()) {console.log('detected wall');}
                else {console.log('no wall');}
                break;
            case 'exitAhead':
                if(this.detectExit()) {console.log('detected exit');}
                else {console.log('no exit');}
                break;
            case 'crumbAhead':
                if(this.detectCrumb()) {console.log('detected crumb');}
                else {console.log('no crumb');}
                break;
            default: break;
        }
    }

    dropCrumb() {
        let crumbPos = this.state.crumbPos;
        crumbPos.push(this.state.prevStart);
        this.setState({crumbPos});
    }

    detectWall() {
        switch(this.state.orientation) {
            case 'l':
                let leftWallMin = Math.floor(this.state.prevStart / this.props.width) * this.props.width;
                return (this.state.prevStart === leftWallMin) ? true : false;
            case 'u':
                let currentRowUpper = Math.floor(this.state.prevStart / this.props.width);
                return (currentRowUpper <= 0) ? true : false;
            case 'r':
                let rightWallMax = (Math.floor(this.state.prevStart / this.props.width) + 1) * this.props.width - 1;
                return (this.state.prevStart === rightWallMax) ? true : false;
            case 'd':
                let currentRowLower = Math.floor(this.state.prevStart / this.props.width);
                return (currentRowLower === this.props.height - 1) ? true : false;
            default: break;
        }
    }

    detectExit() {
        switch(this.state.orientation) {
            case 'l':
                return (this.state.prevStart - 1 === this.state.endLinearPosition ? true : false);
            case 'u':
                return (this.state.prevStart - this.props.width === this.state.endLinearPosition ? true : false);
            case 'r':
                return (this.state.prevStart + 1 === this.state.endLinearPosition ? true : false);
            case 'd':
                return (this.state.prevStart + this.props.width === this.state.endLinearPosition ? true : false);
            default: break;
        }
    }

    detectCrumb() {
        switch(this.state.orientation) {
            case 'l':
                return (this.state.crumbPos.indexOf(this.state.prevStart - 1) > -1 ? true : false);
            case 'u':
                return (this.state.crumbPos.indexOf(this.state.prevStart - this.props.width) > -1 ? true : false);
            case 'r':
                return (this.state.crumbPos.indexOf(this.state.prevStart + 1) > -1 ? true : false);
            case 'd':
                return (this.state.crumbPos.indexOf(this.state.prevStart + this.props.width) > -1 ? true : false);
            default: break;
        }
    }

    changeOrientation(command) {
        let newDirection;
        let orient = this.state.orientation
        switch(orient) {
            case 'l':
                newDirection = command === 'turnLeft' ? 'd' : 'u'
                break;
            case 'u':
                newDirection = command === 'turnLeft' ? 'l' : 'r'
                break;
            case 'r':
                newDirection = command === 'turnLeft' ? 'u' : 'd'
                break;
            case 'd':
                newDirection = command === 'turnLeft' ? 'r' : 'l'
                break;
            default: break;
        }
        this.setState({orientation: newDirection});
    }

    executeMovement() {
        switch(this.state.orientation) {
            case 'r':
                this.moveRight();
                break;
            case 'l':
                this.moveLeft();
                break;                
            case 'd':
                this.moveDown();
                break;
            case 'u':
                this.moveUp();
                break;
            default:
            break;
        }
    }

    moveRight() {
        if(this.state.prevStart < (this.props.width * this.props.height) - 1) {
            let rightWallMax = (Math.floor(this.state.prevStart / this.props.width) + 1) * this.props.width - 1;
            if(this.state.prevStart === rightWallMax) {
                // this.props.hit_wall();
            }

            else {
                let colors = [...this.state.colorList];
                colors[this.state.prevStart] = 'grey';
                colors[this.state.prevStart + 1] = 'green';
                for(var i = 0; i < this.state.crumbPos.length; i++) {
                    colors[this.state.crumbPos[i]] = 'blue';
                }
                this.setState({prevStart: this.state.prevStart + 1});
                this.setState({colorList: colors});
            }
        }
    }

    moveLeft() {
        if(this.state.prevStart > 0) {
            let leftWallMin = Math.floor(this.state.prevStart / this.props.width) * this.props.width;
            if(this.state.prevStart === leftWallMin) {
                // this.props.hit_wall();
            }

            else {
                let colors = [...this.state.colorList];
                colors[this.state.prevStart] = 'grey';
                colors[this.state.prevStart - 1] = 'green';
                for(var i = 0; i < this.state.crumbPos.length; i++) {
                    colors[this.state.crumbPos[i]] = 'blue';
                }
                this.setState({prevStart: this.state.prevStart - 1});
                this.setState({colorList: colors});
            }
        }
    }

    moveUp() {
        // let upperWallMin = Math.floor(this.state.prevStart / this.props.height) * this.props.width - 1;
        let currentRow = Math.floor(this.state.prevStart / this.props.width)
        if(currentRow > 0) {
            let colors = [...this.state.colorList];
            colors[this.state.prevStart] = 'grey';
            colors[this.state.prevStart - this.props.width] = 'green';
            for(var i = 0; i < this.state.crumbPos.length; i++) {
                colors[this.state.crumbPos[i]] = 'blue';
            }
            this.setState({prevStart: this.state.prevStart - this.props.width});
            this.setState({colorList: colors})
        }
        else {
            // this.props.hit_wall();
        }
    }

    moveDown() {
        let currentRow = Math.floor(this.state.prevStart / this.props.width);
        if(currentRow < this.props.height - 1) {
            let colors = [...this.state.colorList];
            colors[this.state.prevStart] = 'grey';
            colors[this.state.prevStart + this.props.width] = 'green';
            for(var i = 0; i < this.state.crumbPos.length; i++) {
                colors[this.state.crumbPos[i]] = 'blue';
            }
            this.setState({prevStart: this.state.prevStart + this.props.width});
            this.setState({colorList: colors})
        }
        else {
            // this.props.hit_wall();
        }
    }

    boardBuilder() {
        console.log(this.state.colorList);
        return (
            <div>
                <section>
                    {this.state.colorList.map((color, index) => {
                        if(color === 'green') {
                            return (
                                <img
                                    key={index}
                                    src={robot}
                                    className={this.getRobot()}
                                    alt='robot-alt'
                                    style={{height: this.state.heightSize, width: this.state.widthSize}}
                                />); 
                        }
                        if(color === 'red' ) {
                            return (
                                <img
                                    key={index}
                                    src={exit}
                                    className='exit'
                                    alt='exit-alt'
                                    style={{height: this.state.heightSize, width: this.state.widthSize}}
                                />);
                        }
                        if(color === 'blue' ) {
                            return(
                                <img
                                    key={index}
                                    src={crumb}
                                    className='crumb'
                                    alt='crumb-alt'
                                    style={{height: this.state.heightSize, width: this.state.widthSize}}
                                />);
                        }
                        else {
                            return(
                                <div
                                    key={index}
                                    style={{backgroundColor: color, height: this.state.heightSize, width: this.state.widthSize}}
                                    className='square'
                                />);
                        }
                    })}
                </section>
            </div>
        );
    }

    getRobot() {
        switch(this.state.orientation) {
            case 'l': return 'robot-left';
            case 'u': return 'robot-up';
            case 'r': return 'robot-right';
            case 'd': return 'robot-down';
            default: break;
        }
    }

    render() {
        return (
            <div>
                <div className='maze-screen'>
                    {this.boardBuilder()}
                </div>
                <button onClick={this.props.reset} className='reset-maze-button'>Reset Maze</button>
            </div>
        );
    }
}

export default MazeScreen;