import { Button, Drawer } from '@mui/material';
import React, { useEffect } from 'react';
import { MdMenu, MdOutlineAccountCircle } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import '../resource/css/HeaderDash.css';
import logo from '../resource/img/logo.svg';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function HeaderDash() {

  const navegate = useNavigate();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    let dataToken = sessionStorage.getItem("expiredToken");
    if (dataToken != null) {
      if (Date.parse(dataToken) < Date.now()) {
        navegate("/");
      }
    } else {
      navegate("/");
    }
  }, []);


  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  return (
    <>
      <div className='headerControler'>
        <div className='header'>
          <div className='header-img'>
            <img src={logo} className="App-logo" alt="logo" width={32} />
          </div>

          <div className='MenuDash'>
            <span className='menuDashTitle'><Link to="/dashboard">Inicio</Link></span>
            <span>|</span>
            <span className='menuDashTitle'><Link to="/receita">Receita</Link></span>
            <span>|</span>
            <span className='menuDashTitle'><Link to="/despesa">Despesa</Link></span>
            <span>|</span>
            <span className='menuDashTitle'><Link to="/meta">Meta</Link></span>
          </div>

          <div className='MenuDashUser'>
            <span className='menuDashTitle'><Link to="/"><MdOutlineAccountCircle /> Usuario</Link></span>
          </div>
        </div>
      </div>




      <React.Fragment key="left">
        <div className='headerSandwichControler'>
          <div className='btSandwich'>
            <Button onClick={toggleDrawer("left", true)}><MdMenu color='black' size={40} /></Button>
          </div>
          <Drawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <div className='header-img-Sandwich'>
              <img src={logo} className="App-logo" alt="logo" width={32} />
            </div>
            <div className='hrSandwich'>
              <hr />
            </div>
            <div className='MenuDashSandwich'>
              <span className='menuDashTitleSandwich'><Link to="/dashboard">Inicio</Link></span>
              <span className='menuDashTitleSandwich'><Link to="/receita">Receita</Link></span>
              <span className='menuDashTitleSandwich'><Link to="/despesa">Despesa</Link></span>
              <span className='menuDashTitleSandwich'><Link to="/meta">Meta</Link></span>
            </div>
            <div className='hrSandwich'>
              <hr />
            </div>
            <div className='MenuDashUserSandwich'>
              <span className='menuDashTitleSandwich'><Link to="/"><MdOutlineAccountCircle /> Usuario</Link></span>
            </div>
          </Drawer>
        </div>
      </React.Fragment>
    </>
  );
}

export default HeaderDash;
