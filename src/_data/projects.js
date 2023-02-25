fetch(
	"https://vzl61mfy.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == 'project']"
)
	.then((data) => {
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		return data.json();
	})
	.then((json) => console.log(json.result));
