import React from 'react';
import Card from 'antd/lib/card';
import './Result.scss';

const Result = ({result}) => {
	const {
		title,
		author_name,
		first_publish_year,
		cover_i,
		key
	} = result;
	// const id = key.replace('/works/', '');
	const { Meta } = Card;
	return <Card
		hoverable
		style={{ width: 240 }}
		cover={<img alt="cover" src={`https://covers.openlibrary.org/w/id/${cover_i}.jpg`} />}
	>
		<Meta
			title="Europe Street beat"
			description="www.instagram.com"
		/>
	</Card>;
};

export default Result;