import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import slug from 'slug';
import Loading from './Loading';


const CustomLink = ({ to, children }) => (
  <Route
    path={to.pathname}
    children={(props)=> (
      <li style={{listStyleType: 'none', fontWeight: props.match ? 'bold' : 'normal'}}>
        <Link to={to}>{children}</Link>
      </li>
    )}
  />
)

export default function Sidebar ({ title, list, loading, location, match }) {
  return loading === true
    ? <Loading />
    : <div>
        <h3 className='header'>{title}</h3>
        <ul className='sidebar-list'>
          {list.map(item => (
            <CustomLink
              key={item}
              to={{
                pathname: `${match.url}/${slug(item)}`,
                search: location.search,
              }}>
              {item.toUpperCase()}
            </CustomLink>
          ))}
        </ul>
      </div>
}

Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}
