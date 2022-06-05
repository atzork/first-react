import React from 'react';

const MySelect = ({options, defaultOption, value, onChange}) => {
    return (
        <select onChange={(e) => onChange(e.target.value)} value={value}>
            <option disabled value=''>{defaultOption}</option>
            {
                options.map((option) => <option key={option.value} value={option.value}>{option.name}</option> )
            }
        </select>
    );
};

export default MySelect;