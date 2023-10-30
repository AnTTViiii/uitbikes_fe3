import React, { useState } from 'react'
import './type-menu.css'
import TypeList from './TypeList'

const TypeMenu = ({getType}) => {
    const [menu, setMenu] = useState(0);
    
    return (
        <div className='type-menu'>
            {TypeList.map((item, index) => 
                <div className={`type-menu-item ${menu === index ? ' active' : ''}`} 
                    onClick={() => {getType(item.type); setMenu(index)}}>
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
