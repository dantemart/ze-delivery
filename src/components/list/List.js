import React from 'react'
import './List.css'
import zeGraph from '../../service/zeGraph'
import Row from './row/Row'

class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: null,
			pocId: this.props.match.params.pocId
		}
	}
	componentDidMount() {
		zeGraph.getList(this.state.pocId).subscribe(res => {
			this.setState({ list: res })
		})
	}
	render() {
		const list = this.state.list
		return (list ? (<div className="list">
			{list &&
				list.map(category => category.products.length > 0 ? <Row key={category.id} category={category}></Row> : null)
			}
		</div>) : (<p>Carregando...</p>)

		)
	}
}

export default List