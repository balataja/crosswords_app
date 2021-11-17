import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link, useHistory, withRouter } from 'react-router-dom';
import GenericForm from '../form-fields/generic-form';
import { getCrossword, getCrosswords, getRandomCrossword, getRandomSundayCrossword } from '../../redux/modules/crossword';
import { getGridState, initializeGridState } from '../../redux/modules/gridState';
import { getGame, getGames, addGame, joinGame } from '../../redux/modules/game';
import { getUserGames } from '../../redux/modules/user';
import { errorPropTypes } from '../../util/proptype-utils';
import { RESET_PASSWORD } from '../../redux/modules/authentication';
import TextInput from '../form-fields/text-input';
import { getAuthenticatedUser } from '../../redux/modules/authentication';
import {
    buildClueMap,
    buildNewGrid,
    buildGrid,
  } from '../crossword/src/javascripts/crosswords/helpers';

const form = reduxForm({
    form: 'gameLobby',
});

class GameLobby extends Component {
    static propTypes = {
        getCrossword: PropTypes.func,
        getCrosswords: PropTypes.func,
        handleSubmit: PropTypes.func,
        errors: errorPropTypes,
        message: PropTypes.string,
        loading: PropTypes.bool,
        user: PropTypes.shape({
            firstName: PropTypes.string,
        }),
        authenticated: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = { game: "game data here..",
            userGames: [{createdDate:
                "2020-01-20T21:51:31.281Z",
                gameId:
                "5e2620e3e20f155870d99e88",
                isActive:
                true
                }],
            user: {
                id: 0
            }
         };
        this.createGame = this.createGame.bind(this);
        this.createSundayGame = this.createSundayGame.bind(this);
        this.createWeekdayGame = this.createWeekdayGame.bind(this);
        this.continueGame = this.continueGame.bind(this);
        this.joinSpecificGame = this.joinSpecificGame.bind(this);
    }

    static formSpec = [
        { id: 'gameId', name: 'gameId', label: 'Join Game', type: 'joinGame', placeholder: 'game ID', component: TextInput },
    ];
      
    async componentDidMount() {
        var res = await this.props.getAuthenticatedUser();
        res.user.games.sort(function(a, b) {
            return new Date(b.createdDate) - new Date(a.createdDate);
        });
        this.setState({
            user: res.user,
        });
    }

    async createSundayGame (formProps) {
        var crosswordRes = await this.props.getRandomSundayCrossword();
        console.log(crosswordRes[0]);
        this.setState({
                crossword: crosswordRes[0]
            },
            this.createGame
        );
    }

    async createWeekdayGame (formProps) {
        var crosswordRes = await this.props.getRandomCrossword();
        console.log(crosswordRes[0]);
        this.setState({
                crossword: crosswordRes[0]
            },
            this.createGame
        );
    }

    async createGame () {
        const gridState = {
            grid: buildNewGrid(
                this.state.crossword.rows,
                this.state.crossword.cols,
                this.state.crossword.entries),
            playerName: this.state.user.firstName + ' ' + this.state.user.lastName,
        };

        var grid = await this.props.initializeGridState(gridState);
        this.setState({
            gridStateId: grid._id
        })
        var game = {
            name: this.state.crossword.name,
            gridStateId: grid._id,//this.state.gridStateId,
            crosswordId: this.state.crossword._id,
            userId: this.state.user.id,
        }

        var gameRes = await this.props.addGame(game);
        this.continueGame(gameRes._id);
    }

    continueGame (gameId) {
        this.props.history.push(
            {
                pathname:'/game/' + gameId,
            }
        );
    }

    async joinGame (game) {
        const data = {
            gameId: game._id,
            userId: this.state.user.id,
        }
        var joinedGame = await this.props.joinGame(data);
        console.log('joining game..');
        console.log(joinedGame);
        this.continueGame(game._id);
    }

    async joinSpecificGame (formProps) {
        const data = {
            gameId: formProps.gameId,
            userId: this.state.user.id,
        }
        
        await this.props.joinGame(data)
        await this.continueGame(formProps.gameId);
    }

    render ()  {
        const { handleSubmit, errors, message, loading } = this.props;

        if (this.state.user.games !== undefined) {

        }

        return (
            <div>
                {this.state.user.games !== undefined && this.state.user.games.map((game, i) => 
                    <div key={i}>
                        <GenericForm
                            onSubmit={handleSubmit(() => this.continueGame(game.gameId))}
                            errors={errors}
                            message={message}
                            submitText={game.name}
                        />
                        <p>Send the following ID to friend to join this game.</p>
                        <p>
                            Game ID: {game.gameId}
                        </p>
                    </div>
                )}
                <GenericForm
                    onSubmit={handleSubmit(this.createSundayGame)}
                    errors={errors}
                    message={message}
                    submitText="Create New Random Sunday Game"
                />
                <br />

                <GenericForm
                    onSubmit={handleSubmit(this.createWeekdayGame)}
                    errors={errors}
                    message={message}
                    submitText="Create New Random Weekday Game"
                />
                <br />

                <GenericForm
                    onSubmit={handleSubmit(this.joinSpecificGame)}
                    errors={errors}
                    message={message}
                    formSpec={GameLobby.formSpec}
                    submitText="Join Game"
                />
            </div>
        )
    }
}

const mapStateToProps = ({ user, authentication }) => ({
    errors: authentication.errors[RESET_PASSWORD],
    message: authentication.messages[RESET_PASSWORD],
    loading: authentication.loading[RESET_PASSWORD],
    authenticated: authentication.authenticated,
  });
  
  export default withRouter(connect(mapStateToProps, { getAuthenticatedUser, getUserGames, getCrosswords, getCrossword, getRandomCrossword, getRandomSundayCrossword, getGame, getGames, addGame, joinGame, getGridState, initializeGridState })(form(GameLobby)));