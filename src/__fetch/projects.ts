export = async () => {
	let response = await fetch(
		"https://vzl61mfy.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == 'project']"
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	let json = await response.json();

	return json.result;
};
