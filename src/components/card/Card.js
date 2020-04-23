import React from 'react'
import './Card.css'
import Button from '../button/Button'

function Card(props) {
	const product = props.product
	return (
		<div className="card">
			<img src={product.images[0].url} onError={(ev) => ev.target.src = '/src/assets/beer.png'} className="card__picture"></img>
			<span className="card__title">{product.title}</span>
			<span className="card__price">R$ {product.productVariants[0].price.toFixed(2)}</span>
			<div className="card__actions">
				<Button label="Remover" style="secondary" size="small"></Button>
				<Button label="Adicionar" style="primary" size="small"></Button>
			</div>
		</div>
	)
}
export default Card