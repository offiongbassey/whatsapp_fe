const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return(
        <div className="error">
            <p>Something went wrong:</p>
            <p>{error.message}</p>
            <button className="btn" onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

export default ErrorFallback;