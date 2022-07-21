import React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

function CustomLink({to, text, className}) {
    
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <>
        <Link
          to={to}
          className={match ? className + " nav__links__selected" : className}
        >
          {text}
        </Link>
      </>
    );
}

export default CustomLink;