export = async () => {
	let response = await fetch(
		"https://vzl61mfy.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20'selectWork'%5D%7B%0A%20%20list%5B%5D-%3E%0A%7D.list%5B%5D%7B%0A%20%20...%2C%0A%20%20cover%7B%0A%20%20%20%20...%2C%0A%20%20%22URL%22%3A%20asset-%3Eurl%7D%2C%0A%20%20content%5B%5D%7B%0A%20%20%20%20...%2C%20%0A%20%20%20%20item%7B...%2C%20%22URL%22%3A%20asset-%3Eurl%7D%0A%20%20%7D%0A%7D"
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	let json = await response.json();

	return json.result;
};
