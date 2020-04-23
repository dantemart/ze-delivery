const rxjs = require('rxjs');
const operators = require('rxjs/operators')

function getId() {
	const variables = {
		"algorithm": "NEAREST",
		"lat": "-23.632919",
		"long": "-46.699453",
		"now": new Date().toISOString()
	}
	const query = `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
		pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
			id
		}
	}
	`

	return rxjs.from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=pocSearchMethod', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables }),
	})
		.then(res => res.json())
		.then(res => res.data)).pipe(
			operators.pluck('pocSearch'),
			operators.map(res => res[0].id)
		);
}

function getCategories() {
	const query = `query allCategoriesSearch {
		allCategory{
			title
			id
		}
	}`
	return rxjs.from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=allCategory', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query }),
	})
		.then(res => res.json())
		.then(res => res.data)).pipe(
			operators.pluck('allCategory'),
			operators.map(res => res)
		);
}

function getProducts() {
	const variables = {
		"id": "532",
		"search": "",
		"categoryId": 94
	}
	const query = `query poc($id: ID!, $categoryId: Int, $search: String){
    poc(id: $id) {
      id
      products(categoryId: $categoryId, search: $search) {
        id
        title
        rgb
        images {
          url
        }
        productVariants {
          price
        }
      }
    }
	}`
	return rxjs.from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=poc', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query, variables }),
	})
		.then(res => res.json())
		.then(res => res.data)).pipe(
			operators.pluck('poc'),
			operators.map(res => res.products)
		);
}

module.exports = {
	getId,
	getCategories,
	getProducts
};