import React from 'react'
import { push as Menu } from 'react-burger-menu'


const BurgerMenu = () => {
  return (
    <div>
      <Menu elastic>
        <ul>
          {/* <li>
              <a className="menu-item" href="/">
                <h3>
                  Home
                </h3>
              </a>
          </li> */}
          <li>
              <a className="menu-item" href="/image">
                <h3>Image Generator</h3>
              </a>
          </li>
          <li>
              <a className="menu-item" href="/generate">
                <h3>
                  Palette Generator
                </h3>
              </a>
          </li>
        </ul>
      </Menu>
    </div>
  )
}

export default BurgerMenu