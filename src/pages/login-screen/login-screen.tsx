import './login-screen.css';
import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction, fetchOffersAction, loginAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, DestinationCities } from '../../const';
import { Link, Navigate } from 'react-router-dom';
import { getRandomInt } from '../../utils/utils';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { selectCity } from '../../store/app-params/app-params';
import { Helmet } from 'react-helmet-async';

const PASSWORD_ERROR_TEXT = 'The password must contain at least one letter and one number';
const PASSWORD_REGEX = {
  LETTER: /[a-zA-Z]/,
  NUMBER: /[0-9]/,
};

function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const randomCityName = DestinationCities[getRandomInt(0, DestinationCities.length)];

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root}/>;
  }

  const validatePassword = (password: string): boolean => {
    const hasLetter = PASSWORD_REGEX.LETTER.test(password);
    const hasNumber = PASSWORD_REGEX.NUMBER.test(password);
    return hasLetter && hasNumber;
  };

  const handleCityClick = (cityName: string) => () => {
    dispatch(selectCity(cityName));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      const email = loginRef.current.value;
      const password = passwordRef.current.value;

      if (!validatePassword(password)) {
        setPasswordError(PASSWORD_ERROR_TEXT);
        return;
      }

      setPasswordError(null);

      dispatch(loginAction({email, password}))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoritesAction());
          dispatch(fetchOffersAction());
        })
        .catch((error) => {
          setPasswordError(String(error));
        });
    }
  };

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>Шесть городов: Авторизация</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                ref={loginRef}
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={passwordRef}
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                onChange={() => setPasswordError(null)}
                required
              />
            </div>
            {passwordError && (
              <div className="login__error">{passwordError}</div>
            )}
            <button
              className="login__submit form__submit button"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Root}
              onClick={handleCityClick(randomCityName)}
            >
              <span>{randomCityName}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;

