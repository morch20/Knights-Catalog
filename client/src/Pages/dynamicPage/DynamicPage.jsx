import React, { useEffect } from 'react';
import Course from './containers/Course';
import { useLocation, useSearchParams } from 'react-router-dom';

const DynamicPage = () => {

    const {pathname} = useLocation();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    const name = pathname.substring(1).split("%20").join(' ');

	useEffect(() => {
		window.scrollTo(0, 0);
	  }, []);
    
    if(type === 'course'){
        return(
            <Course name={name} />
        )
    }

	return (
		<div>{pathname}</div>
	)
}

export default DynamicPage;