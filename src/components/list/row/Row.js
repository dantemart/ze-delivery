import React from 'react'
import './Row.css'
import Card from '../../card/Card'
import Button from '../../button/Button'

function Row(props) {
	const category = props.category
	const products = []
	category.products.forEach((product, index, arr) => {
		products.push(
			<Card key={product.id} product={product}></Card>
		)
	})
	return (
		<div className="row">
			<h3 className="row__title">{category.title}</h3>
			<div className="row__items">
				{products}
			</div>
		</div>
	)
}
export default Row