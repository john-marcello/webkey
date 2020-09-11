import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Auth from '../pages/Auth'

import 'bootstrap/dist/css/bootstrap.min.css';
import { getLinks } from '../api';
import Links from '../pages/Links';
import Content from './Content'
import Login from '../pages/Login';
import Register from '../pages/Register'

const App = () => {
    const [links, setLinks] = useState([]);
    const [newUser, setNewUser] = useState({})

    useEffect(() => {
        getLinks()
            .then((response) => {
                console.log('response..', response)
                setLinks(response.links);
            })
            .catch((error) => {
                setLinks(error);
            });
    }, []);



    console.log('this is the links', links)
    return (
        <div className='App'>
            <Router>
                <Header />
                <Switch>
                    <Route path='/login' exact render={() => <Login />} />

                    <Route path='/register' exact render={() => <Register newUser={newUser} setNewUser={setNewUser} />} />

                    <Route path='/home' exact render={() => < Main links={links} />} />
                </Switch>
                <Footer />
            </Router>

        </div>
    );

};

export default App;
