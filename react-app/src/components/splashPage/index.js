import React from 'react';
import './splashPage.css';

const SplashPage = () => {
  //   const routeChange = () => {
  //     let path = '/home';
  //     history.push(path);
  //   };
  //   const history = useHistory();
  return (
    <div className="splash-container">
      {/* <div className="description-container"> */}
        <div className="description">
          <h1>La table</h1>
          <h3>/lä ˈtābəl/ </h3>
          <div className="search">
            <input
              type="text"
              id="splash-search"
              placeholder="Find my next experience"
            ></input>
            <div className="icon-div">
              <i className="fas fa-search"></i>
            </div>
          </div>
          <p>Find the most exclusive tables in the LA area!</p>
          {/* <button onClick={routeChange} className="description-btn">
            Find my next experience
          </button> */}
        </div>
      {/* </div> */}
    </div>
  );
};

export default SplashPage;
