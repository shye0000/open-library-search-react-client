import React from 'react';
import {Link} from 'react-router-dom';

const HomeLink  = () => {
	return <Link style={{fontWeight: 'bold'}} to="/" >Back to home</Link>;
};

export default HomeLink;