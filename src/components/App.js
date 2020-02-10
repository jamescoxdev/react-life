import React, { Component } from 'react';
import Menu from './menu.ui';
import Board from './board.ui';
import '../styles/App.scss';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            gameboard: [],
            width: 50,
            height: 50,
            running: false,
            tick: 100,
            teleport: false,
            tickOptions: [100,250,500,750,1000,1250,1500,1750,2000],
            dimensionOptions: [10,20,30,40,50,60,70,80,90,100]
        }
    }

    componentDidUpdate(){
        return this.state.running ? this.updateBoard(this.state.tick) : null;
    }
    updateBoard = (tick) => {
        var current = this.state.gameboard;
        let clone = current.map((row,rowIndex) => {
            return row.map((col,colIndex) => {
                return this.checkLife(rowIndex,colIndex);
            });
        });

        setTimeout(() => {
            this.setState({gameboard:clone})
        }, tick);
    }
    checkLife = (row,col) => {
        let current = this.state.gameboard;
        let lifeCount = 0;
        const teleport = this.state.teleport;

        const proxy = new Proxy(current, {
            get(target,prop){
                if(!isNaN(prop)){
                    prop = parseInt(prop, 10);
                    if(!teleport && (prop < 0 || prop >= target.length)) return false;
                    if(prop < 0){
                        prop += target.length;
                    } else if(prop === target.length){
                        prop = 0;
                    }
                }
                return target[prop];
            }
        });

        if(proxy[row - 1][col - 1]) lifeCount++;
        if(proxy[row - 1][col]) lifeCount++;
        if(proxy[row - 1][col + 1]) lifeCount++;
        if(proxy[row][col - 1]) lifeCount++;
        if(proxy[row][col + 1]) lifeCount++;
        if(proxy[row + 1][col - 1]) lifeCount++;
        if(proxy[row + 1][col]) lifeCount++;
        if(proxy[row + 1][col + 1]) lifeCount++;

        switch(lifeCount){
            case 3:
                return true;
            case 2:
                return current[row][col] ? true : false;
            default:
                return false;
        }
    }
    seed = () => {
        var gameboard = [...this.state.gameboard];
        var width = this.state.width;
        var height = this.state.height;
        for(var i=0;i<width;i++){
            gameboard[i] = [];
        }
        for(var r=0;r<height;r++){
            for(var c=0;c<width;c++){
                let rand = Math.round(Math.random());
                rand === 1 ? gameboard[r][c] = true : gameboard[r][c] = false;
            }
        }
        this.setState({
            gameboard,
            running:true
        });
    }
    toggleRunning = () => {
        this.setState({running:!this.state.running});
    }
    reset = () => {
        this.setState({running:false});
        setTimeout(() => {
            this.setState({
                gameboard: [],
                width: 50,
                height: 50,
                tick: 100,
                teleport: false
            })
        }, 500);
    }
    inputChanges = (e,i) => {
        let value = i === 'teleport' ? e.target.checked : e.target.value;
        this.setState({[i]:value});
    }

    render(){
        return (
            <div className="App">
                <Menu
                    gameboard={this.state.gameboard}
                    running={this.state.running}
                    seed={this.seed}
                    toggleRunning={this.toggleRunning}
                    reset={this.reset}
                    inputChanges={this.inputChanges}
                    checked={this.state.teleport}
                    tick={this.state.tick}
                    width={this.state.width}
                    height={this.state.height}
                    tickOpts={this.state.tickOptions}
                    dimensionOpts={this.state.dimensionOptions}
                />
                <Board
                    gameboard={this.state.gameboard}
                    width={this.state.width}
                    height={this.state.height}
                />
            </div>
        );
    }
}

export default App;