import React, { Component } from 'react';
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
        this.detectItem = this.detectItem.bind(this);
        this.detectWall = this.detectWall.bind(this);
        this.detectExit = this.detectExit.bind(this);
        this.detectCrumb = this.detectCrumb.bind(this);

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
            crumbPos: -1
        };
    }

    componentDidUpdate() {
        if (this.state.prevStart === this.state.endLinearPosition) {
            setTimeout(()=>{this.props.trigger_win()}, 500);    
        }
    }

    resetMaze() {
        this.setState({prevStart: this.state.originalStart, colorList: this.state.originalColorList, orientation: 'u'});
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
            case 'exitAhead':
            case 'crumbAhead':
                if(this.detectItem(instruction)) {console.log('hit wall');}
                else {console.log('no wall');}
                break;
            default: break;
        }
    }

    dropCrumb() {
        this.setState({crumbPos: this.state.prevStart});
    }

    detectItem(instruction) {
        switch(instruction) {
            case 'wallAhead':
                return this.detectWall();
            case 'exitAhead':
                return this.detectExit();
            case 'crumbAhead':
                return this.detectCrumb();
            default: break;
        }
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

                break;
            case 'u':

                break;
            case 'r':

                break;
            case 'd':

                break;
            default: break;
        }
    }

    detectCrumb() {
        switch(this.state.orientation) {
            case 'l':

                break;
            case 'u':

                break;
            case 'r':

                break;
            case 'd':

                break;
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
                colors[this.state.crumbPos] = 'blue';
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
                colors[this.state.crumbPos] = 'blue';
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
            colors[this.state.crumbPos] = 'blue';
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
            colors[this.state.crumbPos] = 'blue';
            this.setState({prevStart: this.state.prevStart + this.props.width});
            this.setState({colorList: colors})
        }
        else {
            // this.props.hit_wall();
        }
    }

    boardBuilder() {
        return (
            <div>
                <section>
                    {this.state.colorList.map((color, index) => {
                        return(
                            <div
                                key={index}
                                style={{backgroundColor: color, height: this.state.heightSize, width: this.state.widthSize}}
                                className='square'
                            />);
                    })}
                </section>
            </div>
        );
    }

    render() {
        return (
            <div className='maze-screen'>
                {this.boardBuilder()}
            </div>
        );
    }
}

export default MazeScreen;