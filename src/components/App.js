import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {handleInitialData} from "../actions/shared";
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './Tweet/NewTweet';
import TweetPage from './Tweet/TweetPage';
import Navigation from './Navigation/Navigation'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Navigation />
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Dashboard}/>
                                <Route path='/tweet/:id' component={TweetPage}/>
                                <Route path='/new' component={NewTweet}/>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App);
