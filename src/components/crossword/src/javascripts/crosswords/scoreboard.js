import React, { Component } from 'react';
import { classNames } from './classNames';

class Scoreboard extends Component {
    render() {
        const score = this.props.score;
        var divStyle = {
            width: '31px',
            height: '31px',
            border: 'solid',
            margin: 'auto',
          };
        var table = {
            width: '100%',
            textAlign: 'center',
        }
          
        return(
            <div className="crossword__scoreboard">
                <h4>Player Scoreboard:</h4>
                <table style={table}>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Color</th>
                            <th>Words</th>
                            <th>Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {score.map((value, index) => {
                            return <tr key={index}>
                                <td>{value.playerName}</td>
                                <td>
                                    <div style={divStyle}
                                        className={classNames({
                                            'crossword__scoreboard--p1': value.playerNumber == 1,
                                            'crossword__scoreboard--p2': value.playerNumber == 2,
                                            'crossword__scoreboard--p3': value.playerNumber == 3,
                                            'crossword__scoreboard--p4': value.playerNumber == 4,
                                            'crossword__scoreboard--p5': value.playerNumber == 5,
                                            'crossword__scoreboard--p6': value.playerNumber == 6,
                                        })}>
                                    </div> 
                                </td>
                                <td>{value.wordsCompleted}</td>
                                <td>{value.cellsAnswered}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export { Scoreboard };