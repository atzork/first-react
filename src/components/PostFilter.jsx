import React from 'react';
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div className='PostFilter'>
            <input value={filter.query} placeholder='Search' onChange={(e) => setFilter({...filter, query: e.target.value})}/>
            <MySelect
                value={filter.sort}
                defaultOption='Sort by'
                options={[{value: 'title', name: 'title'}, {value: 'body', name: 'body'}]}
                onChange={(sortKey) => setFilter({...filter, sort: sortKey})}/>
        </div>
    );
};

export default PostFilter;