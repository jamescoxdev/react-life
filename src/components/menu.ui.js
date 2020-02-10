import React from 'react';
import Eco from '@material-ui/icons/Eco';
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Replay from '@material-ui/icons/Replay';
import styles from '../styles/menu.module.scss';

function Menu(props){
    const { gameboard, running, seed, toggleRunning, reset, inputChanges, checked, tick, width, height, tickOpts, dimensionOpts } = props;
    return(
        <div className={styles.container}>
            <div className={styles.buttons} style={{display: gameboard.length ? 'block' : 'none'}}>
                <button style={{marginBottom:'10px'}} onClick={toggleRunning}>{running ? <Pause /> : <Play />}</button>
                <br />
                <button onClick={reset}><Replay /></button>
            </div>
            <div className={styles.loader} style={{display: gameboard.length ? 'none' : 'block'}}>
                <label className={styles.switch}>
                    Teleport Across Edges
                    <input type="checkbox" checked={checked} onChange={(e) => { inputChanges(e,'teleport'); }} />
                    <i></i>
                </label>
                <label>
                    Life Cycle (miliseconds)
                    <br />
                    <select onChange={(e) => { inputChanges(e,'tick'); }} value={tick}>
                        {tickOpts.map((v,i) => {
                            return <option key={i}>{v}</option>
                        })}
                    </select>
                </label>
                <label>
                    Width
                    <br />
                    <select onChange={(e) => { inputChanges(e,'width'); }} value={width}>
                        {dimensionOpts.map((v,i) => {
                            return <option key={i}>{v}</option>
                        })}
                    </select>
                </label>
                <label>
                    Height
                    <br />
                    <select onChange={(e) => { inputChanges(e,'height'); }} value={height}>
                        {dimensionOpts.map((v,i) => {
                            return <option key={i}>{v}</option>
                        })}
                    </select>
                </label>
                <div style={{textAlign:'center'}}>
                    <button onClick={seed}><Eco style={{float:'left',marginRight:'5px'}} />Seed</button>
                </div>
            </div>
        </div>
    )
}

export default Menu;