import React from 'react';
import styles from '../styles/board.module.scss';

function Board(props){
    const { gameboard, width, height } = props;
    const top = (height) => {
        let winHigh = window.innerHeight;
        return winHigh > ((height*8) + 10) ? 'calc(50% - ' + (((height*8) + 10)/2) + 'px)' : '0px';
    }
    return(
        <div className={styles.board}>
            <div className={styles.background}></div>
            <div className={styles.container} style={{width:(width*8) + 'px',height:(height*8) + 'px',top:top(height),display:gameboard.length ? 'block':'none'}}>
                {gameboard.map((row,rowIndex) => {
                    return <div key={'row-' + rowIndex} className={styles.rows}>
                        {row.map((col,colIndex) =>{
                            return <div key={'col-' + colIndex} className={styles.cols + ' ' + (col ? styles.blue : '')}></div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Board;