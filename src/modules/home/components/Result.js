import React from 'react';
import {Link} from 'react-router-dom';
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
	const { Meta } = Card;
	const resultId = key.replace('/works/', '');
	return <Link to={`/book/${resultId}`}>
		<Card
			hoverable
			className="result"
			cover={<img
				className="cover"
				alt="cover"
				align="middle"
				src={`https://covers.openlibrary.org/w/id/${cover_i}.jpg`}
			/>}
		>
			<Meta title={first_publish_year ? first_publish_year : 'unknown'} />
			<Meta
				title={title}
				description={author_name ? author_name.join(', ') : ' '}
			/>
		</Card>
	</Link>;
};

export default Result;