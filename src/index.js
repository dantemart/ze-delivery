import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Search from './components/search/Search'
import List from './components/list/List'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="app">
				<Header></Header>
				<div className="app__content">
					<BrowserRouter>
						<Route path="/" exact={true} component={Search} />
						<Route path="/list/:pocId" exact={true} component={List} />
					</BrowserRouter>
				</div>
				<Footer></Footer>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))