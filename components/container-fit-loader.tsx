import React from 'react';
import loaderIcon from './../loader.gif';


const ContainerFitLoader = (
  props: any
) => {
  return (
    <div className="ContainerFitLoader">
      {' '}
      <div className="ContainerFitLoader__icon">
        {/* <img
          style={{ width: 50, height: 50 }}
          src={loaderIcon}
          alt={'..'}
        ></img> */}
        <div className="lds-roller d-flex align-items-center justify-content-center">
          <img src={'/loader.gif'} alt={'..'} style={{ height: 50 }}></img>
        </div>
      </div>
      {props.text && <div className="Loader__text">{props.text}</div>}
    </div>
  );
};

export default ContainerFitLoader;
