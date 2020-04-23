import React from 'react'
import './Search.css'
import zeGraph from '../../service/zeGraph';
import googleMaps from '../../service/googleMaps';
import Button  from '../button/Button'

class Search extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			address: 'Rua Américo Brasiliense, São Paulo',
			loading: true,
			unavailableAddress: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		this.setState({ loading: false })
	}

	componentWillUnmount() {
	}

	handleChange(event) {
		const name = event.target.name
		const value = event.target.value
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event) {
		googleMaps.getAddressCoordenates(this.state.address).then(res => {
			if (!res) {
				this.setState({ unavailableAddress: true })
				return
			}
			zeGraph.getId(res.lat, res.lng).subscribe(res => {
				if (!res) {
					this.setState({ unavailableAddress: true })
				} else {
					this.props.history.push(`/list/${res}`)
				}
			})
		})
		event.preventDefault()
	}

	render() {
		const loading = this.state.loading
		const unavailableAddress = this.state.unavailableAddress
		return (
			<div className="search">
				{loading && (
					<p>Carregando...</p>
				)}
				{!loading && (
					<form className="search__form" onSubmit={this.handleSubmit}>
						<div className="search__input">
							<label className="search__label">Inserir endereço para pedir</label>
							<input name="address" type="text" placeholder="Ex.: Av. Paulista, 335" value={this.state.address} onChange={this.handleChange} required />
						</div>
						<Button style="primary" label="Pesquisar"></Button>
						{unavailableAddress && <p>Não há produtos disponíveis para entrega neste endereço :/</p>}
					</form>
				)}
			</div>
		)
	}
}
export default Search