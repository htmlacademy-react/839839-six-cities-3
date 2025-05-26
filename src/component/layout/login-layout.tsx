import { Outlet } from 'react-router-dom';
import Header from '../header/header';

function LoginLayout () {

  return (
    <div className="page page--gray page--login">
      <Header />
      <Outlet />
    </div>
  );
}

export default LoginLayout;
