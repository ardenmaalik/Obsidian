import React, {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectProjectId, selectProjectName } from "./features/appSlice";

import NoMatch from "./Tasks/components/NoMatch";
import Header from "./Interface/components/Header";
import Sidebar from "./Interface/components/Sidebar";
import Homepage from "./Tasks/components/Homepage";
import Chat from "./Chat/components/Chat";
import MyTasks from "./Tasks/components/MyTasks";
import Login from "./Chat/components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Spinner from "react-spinkit";

function App() {
	const [user, loading] = useAuthState(auth);
	const projectId = useSelector(selectProjectId);
	const title = useSelector(selectProjectName);

	const history = useHistory();

	useEffect(() => {
		console.log('Router ids: ', projectId, title)
	})

	if (loading) {
		return (
			<AppLoading>
				<AppLoadingContents>
					<img
						src='https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg'
						alt=''
					/>
					<Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
				</AppLoadingContents>
			</AppLoading>
		);
	}
	return (
		<div className='app'>
			<Router history={history}>
				<>
					<Header />
					<AppBody>
						<Sidebar />
						<Switch>
							<Route exact path='/'>
								<Homepage />
							</Route>
							<Route exact path={`/${projectId}/project/${title}`}>
								<MyTasks />
							</Route>
							<Route exact path="*">
								<NoMatch />
							</Route>
						</Switch>
						<Chat />
					</AppBody>
				</>
			</Router>
		</div>
	);
}

export default App;

const AppBody = styled.div`
	display: flex;
	height: 100vh;
`;

const AppLoading = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100%;
`;
const AppLoadingContents = styled.div`
	text-align: center;
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> img {
		height: 100px;
		padding: 20px;
		margin-bottom: 40px;
	}
`;
