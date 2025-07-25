import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='pt-10'>
            {title && <Cover img={img} title={title}></Cover>}
            <div className='grid md:grid-cols-2 gap-10 mt-8'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/shop/${title}`}>
                <div className='text-center'>
                    <button className="btn btn-outline mt-8 mb-8 border-0 border-b-4">Order Your Favourite Food</button>
                </div>
            </Link>
        </div>
    );
};

export default MenuCategory;