import { useAppSelector } from '../../hooks';
import { getError } from '../../store/data-precess/selectors';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}

export default ErrorMessage;
