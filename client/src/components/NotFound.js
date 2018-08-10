import React from 'react';

const NotFound = () => (
  <div className="notFound">
    <h1 className="notFound__title">Sorry, the page not found</h1>
    <p className="notFound__message">
      The link you followed probably broken or the page has been removed. There might be database
      connection issue.
    </p>
    <p className="notFound__message">
      <p>To resolve the issue, please contact</p>
      <a href="mailto:eipdstatusreporting@lists.wisc.edu"> eipdstatusreporting@lists.wisc.edu.</a>
    </p>

    <button
      className="btn btn__notFound"
      onClick={() => {
        window.history.back();
      }}
    >
      Go Back
    </button>
  </div>
);

export default NotFound;
