import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { IColorVariant, IDesign } from '../models/models';
import { ExploreColorSection } from './exploreColorSection';
import SliderWithListItems from './sliderwithListItems';

interface CustomProps {
  externalVariant: IColorVariant[];
  internalVariant: IColorVariant[];
  buildLink?: string;
  model: string;
  onRequestCallback: any;
  onDownloadBrochure: any;
}

const ExploreColorTab: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const [selectedTab, setSelectedTab] = React.useState<'exterior' | 'interior'>(
    'exterior'
  );
  const { t, i18n } = useTranslation('');
  return (
    <>
      <div className="detail-gallery py-lg-4 pt-4 pb-3" id="exploreColor">
        <h3 className="text-uppercase text-center mb-3 px-3">
          {' '}
          {t('common.explore_the_color')}
        </h3>

        <div className="tab-content detail-banner">
          <div className={`tab-pane fade show active`}>
            <div className="position-relative mb-lg-3">
              <ul className="nav nav-pills tab-underline d-inline-flex mb-2 font-normal zIndex-1 top-0 left-0 w-100 justify-content-center pb-lg-4 pt-lg-0 py-3 text-uppercase">
                <li className="nav-item mr-md-5 mr-4">
                  <a
                    className={`nav-link font-weight-bold px-0 bg-transparent ${selectedTab === 'exterior' ? `text-primary active` : ''
                      }`}
                    onClick={() => setSelectedTab('exterior')}
                  >
                    {t('dashboard.Exterior')}
                  </a>
                </li>
                <li className="nav-item mr-md-5 mr-4">
                  <a
                    className={`nav-link font-weight-bold px-0 bg-transparent ${selectedTab === 'interior' ? `text-primary active` : ''
                      }`}
                    onClick={() => setSelectedTab('interior')}
                  >
                    {t('dashboard.Interior')}
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className={`tab-pane fade show active `}>
                  <ExploreColorSection
                    key={selectedTab}
                    data={
                      selectedTab === 'exterior'
                        ? props.externalVariant ?? []
                        : props.internalVariant ?? []
                    }
                    model={props.model}
                    onRequestCallback={props.onRequestCallback}
                    onDownloadBrochure={props.onDownloadBrochure}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreColorTab;
