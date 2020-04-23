import React from 'react'
import './Button.css'

function Button(props) {
	let className = 'button'
	const label = props.label
	props.style == 'primary' ? className += ' button--primary' : className += ' button--secondary'
	props.size == 'small' ? className += ' button--small' : className
	return (
		<button className={className}>{label}</button>
	)
}
export default Button