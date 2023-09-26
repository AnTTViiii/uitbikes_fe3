import React from 'react'
import './type-menu.css'
import TypeList from './TypeList';
import Product from '../Product/Product';
const TypeMenu = ({getType}) => {
    return (
        <div className='type-menu'>
        {TypeList.map((item, index) => 
            <div className="type-menu-item" onClick={() => getType(item.type)}>
                <div className="type-menu-item-icon">
                    {item.icon}
                </div>
                <div className="type-menu-item-txt">
                    {item.text}
                </div>
            </div>
        )}
        </div>
    )
}

export default TypeMenu
