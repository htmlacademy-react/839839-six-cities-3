import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="loading">
      <div className="loading__content">
        <div className="loading__spinner"></div>
        <p className="loading__text">Loading ...</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
