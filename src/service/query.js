export const Queries = {
	pocSearchMethod: `query pocSearchMethod($now: DateTime!, $algorithm: String!, $lat: String!, $long: String!) {
		pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
			id
		}
	}
	`,
	allCategoriesSearch: `query allCategoriesSearch {
		allCategory{
			title
			id
		}
	}`,
	poc: `query poc($id: ID!, $categoryId: Int, $search: String){
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
}