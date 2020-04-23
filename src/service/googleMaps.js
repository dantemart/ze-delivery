import { Queries } from './query'
import { from } from 'rxjs'
import { pluck, map } from 'rxjs/operators'

const googleMaps = {
	// I'm trusting my key to you :)
	getAddressCoordenates: (address) => {
		return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAcZX3mq2ExYlaz_fyxg69r5UG43b3FtUY&address=${encodeURI(address)}`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => res.results[0] ? res.results[0].geometry.location : null)
	}
}

export default googleMaps