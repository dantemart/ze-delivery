import { Queries } from './query'
import { from, of, forkJoin } from 'rxjs'
import { pluck, map, flatMap } from 'rxjs/operators'

export default class zeGraph {
	static getId(lat, long) {
		const variables = {
			"algorithm": "NEAREST",
			"lat": lat.toString(),
			"long": long.toString(),
			"now": new Date().toISOString()
		}

		return from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=pocSearchMethod', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: Queries.pocSearchMethod, variables }),
		})
			.then(res => res.json())
			.then(res => res.data)).pipe(
				pluck('pocSearch'),
				map(res => res[0] ? res[0].id : null)
			);
	}
	static getCategories() {
		return from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=allCategory', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: Queries.allCategoriesSearch }),
		})
			.then(res => res.json())
			.then(res => res.data)).pipe(
				pluck('allCategory'),
				map(res => res)
			);
	}
	static getProducts(pocId, categoryId, search) {
		const variables = {
			"id": pocId,
			"search": search ? search : "",
			"categoryId": parseInt(categoryId)
		}
		return from(fetch('https://api.code-challenge.ze.delivery/public/graphql?operationName=poc', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query: Queries.poc, variables }),
		})
			.then(res => res.json())
			.then(res => res.data)).pipe(
				pluck('poc'),
				map(res => res.products)
			);
	}
	static getList(pocId) {
		return this.getCategories().pipe(
			flatMap(
				categories => {
					if (categories.length > 0) {
						return forkJoin(
							categories.map(category => {
								return this.getProducts(pocId, category.id, '').pipe(
									map(
										res => {
											category.products = res
											return category
										}
									)
								)
							})
						)
					}
					return of([])
				}
			)
		)
	}
}