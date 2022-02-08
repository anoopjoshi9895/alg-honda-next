import React from 'react';
import { LoaderProps } from '..';

interface ContainerLoaderProps extends LoaderProps {
  height?: number;
}
const ContainerLoader: React.FunctionComponent<ContainerLoaderProps> = (
  props: ContainerLoaderProps
) => {
  return (
    <div
      className="Loader ContainerLoader"
      style={{ minHeight: props.height || 50 }}
    >
      {' '}
      <div className="ContainerLoader__icon">
        <img src="/assets/svg/honda.svg" alt={'..'} style={{ height: 100 }}></img>
      </div>
      {props.text && <div className="Loader__text">{props.text}</div>}
    </div>
  );
};

export default ContainerLoader;
