fetch(
	"https://vzl61mfy.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == 'project']"
)
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return response.json();
	})
	.then((data) => data.result);
