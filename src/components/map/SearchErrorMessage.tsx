interface SearchErrorMessageProps {
    status: string;
  }
  
  export const SearchErrorMessage = ({ status }: SearchErrorMessageProps) => {
    // Section 6.2: switch error messages in response to Google Maps server status
    if (status === '' || status === 'OK') {
      return null;
    }
  
    return (
      <div role="alert">
        {status === 'ZERO_RESULTS' || status === 'INVALID_REQUEST' || status === 'NOT_FOUND' ? (
          <p>No place is found on the map. Try another search term.</p>
        ) : status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED' ? (
          <p>
            My Ideal Map is currently unable to use Google Maps search. Please contact us so we can fix the
            problem.
          </p>
        ) : (
          <p>
            Google Maps server is down.{' '}
            <a
              href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history"
              target="_blank"
              rel="noreferrer"
            >
              Please check its status
            </a>
            , and try again once they fix the problem (usually within a few hours).
          </p>
        )}
      </div>
    );
  };
  