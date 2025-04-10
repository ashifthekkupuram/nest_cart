import './menu.scss'
import { Link } from 'react-router-dom'

import { menu } from '../../data'

const Menu = () => {
  return (
    <div className='menu'>
      {menu.map((menu) =>
        <div className="item">
          <span className='title'>{menu.title}</span>
          {menu.items.map((item) => 
          <Link to={item.to} className='listItem'>
            <img src={item.img} alt="" />
            <span className='listItemTitle' >{item.itemTitle}</span>
          </Link>)}
        </div>)}
    </div>
  )
}

export default Menu
