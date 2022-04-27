import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: true });
	const style = {
		color: 'var(--primary-color)',
	};
	return (
		<div>
			<Link style={match && style} className='h-full' to={to} {...props}>
				{children}
			</Link>
		</div>
	);
};

export default CustomLink;
