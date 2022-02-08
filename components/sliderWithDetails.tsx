import React from 'react';
import { IImageWithDescription } from '../models/models';
import SliderWithListItems from './sliderwithListItems';

interface CustomProps {
  title: string;
  align: 'left' | 'right';
  items: IImageWithDescription[];
  buildLink?: string;
}

const SliderWithDetails: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <div id={props.title} className="pb-lg-4 pt-lg-5 pt-4 pb-3">
      <h3 className="h1 text-lg-center pb-3 pb-lg-5 mb-0 px-3">{props.title}</h3>
      <SliderWithListItems
        buildLink={props.buildLink}
        align={props.align}
        imageItems={props.items}
      />
    </div>
  );
};

export default SliderWithDetails;
