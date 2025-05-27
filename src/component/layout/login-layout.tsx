import { Outlet } from 'react-router-dom';
import Logo from '../logo/logo';

function LoginLayout(): JSX.Element {

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default LoginLayout;
