// set up depedent react and dom components
// set up useState and useEffect

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// set up boostrap css

import 'bootstrap/dist/css/bootstrap.min.css';

// set up global containers

import Header from '../components/Header';
import Footer from '../components/Footer';

// set up page/view level containers

import { getLinks, getTags } from '../api';
import Main from '../components/Main';
import Login from '../pages/Login';
import Register from '../pages/Register';

// set up top level app component

const App = () => {
	const [links, setLinks] = useState([]);
	const [tags, setTags] = useState([]);
	const [filteredTags, setFilteredTags] = useState([]);
	const [user, setUser] = useState({});

	//user verification
	function localStorageUser() {
		if (localStorage.getItem('user')) {
			const localStorageUser = JSON.parse(localStorage.getItem('user'));
			return localStorageUser;
		} else {
			return {};
		}
	}
	useEffect(() => {
		setUser(localStorageUser());
	}, []);



	useEffect(() => {
		getLinks()
			.then((response) => {
				setLinks(response);
			})
			.catch((error) => {
				setLinks(error);
			});
		getTags()
			.then((result) => {
                setTags(result);
                setFilteredTags(result);
			})
			.catch((error) => {
				setTags(error);
			});
	}, [user]);

	return (
		<div className='App'>
			<Router>
				<Header user={user} setUser={setUser} />
				<main id='main'>
					{user.token ? (
						<div id='page' className='page-main'>
							<Route
								path='/'
								exact
								render={() => (
									<Main
										user={user}
										links={links}
										setLinks={setLinks}
										tags={tags}
										setTags={setTags}
										filteredTags={filteredTags}
										setFilteredTags={setFilteredTags}
									/>
								)}
							/>
							<Redirect
								to='/'
								exact
								render={() => (
									<Main
										user={user}
										links={links}
										setLinks={setLinks}
										tags={tags}
                                        setTags={setTags}
                                        filteredTags={filteredTags}
										setFilteredTags={setFilteredTags}
									/>
								)}
							/>
						</div>
					) : (
						<Switch>
							<div id='page' className='page-entry'>
								<Route
									path='/login'
									exact
									render={() => <Login user={user} setUser={setUser} />}
								/>
								<Route
									path='/register'
									exact
									render={() => <Register user={user} setUser={setUser} />}
								/>
								<Redirect to='/login' />
							</div>
						</Switch>
					)}
				</main>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
