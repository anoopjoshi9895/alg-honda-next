import React from 'react';
import { useTranslation } from 'react-i18next';
// import '../../assets/sass/common.scss';
// import '../../assets/sass/cms.scss';
import { IContactViewItem, ServiceItem } from '../../components/../models/models';
interface CustomProps {
  data: IContactViewItem;
}
enum Tabs {
  showroom = 'showroom',
  servicecenter = 'servicecenter'
}
const TabPane: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = React.useState<Tabs>(Tabs.showroom)

  return (
    <>
      <div className="tab-content">
        <div className="tab" id="automobiles">
          <div className="d-inline-block w-100">
            <h2 className={`align-items-center d-flex justify-content-between pb-4 tab-head h2 ${tab === Tabs.showroom ? 'active' : 'inactive'}`}>
              {t('common.Showrooms')}{' '}
              <i className={`d-lg-none font-sm mr-2 pl-4 ${tab === Tabs.showroom ? 'icon-chevron-up' : 'icon-chevron-down'}`} onClick={() => setTab(Tabs.showroom)}></i>
            </h2>
            <div className={`shaowroom-tab sub-tab mb-4 ${tab === Tabs.showroom ? 'active' : 'inactive'}`}>
              <div className="row">
                {props?.data?.showRooms?.map((item, key) => {
                  return (
                    <div className="col-12 col-sm-6 col-md-4 mb-4 mt-1" key={key}>
                      <div className="h-100 border p-3 p-lg-4">
                        <h6 className="font-base">{item.title}</h6>
                        <p className="font-normal">{item?.address}</p>
                        <div className="row mx-0 font-normal p-lg-1 mb-3">
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('header.city')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.city}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Timings')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.timings}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('car_service.phone')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.phone}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Fax')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.fax}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Postal Code')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.postalCode}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('form.Email')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.email}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('form.Category')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.category}
                          </div>
                        </div>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="align-items-center d-flex font-normal font-weight-semibold text-primary"
                        >
                          <i className="font-xl icon-direction mr-2"></i>
                          {t('common.Get Direction')}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="d-inline-block  w-100">
            <h2 className={`align-items-center d-flex justify-content-between pb-4 tab-head h2 ${tab === Tabs.servicecenter ? 'active' : 'inactive'}`}>
              {t('common.Service Centers')}{' '}
              <i className={`d-lg-none font-sm mr-2 pl-4 ${tab === Tabs.servicecenter ? 'icon-chevron-up' : 'icon-chevron-down'}`} onClick={() => setTab(Tabs.servicecenter)}></i>
            </h2>
            <div className={`service-tab sub-tab mb-4 ${tab === Tabs.servicecenter ? 'active' : 'inactive'}`}>
              <div className="row">
                {props?.data?.serviceCenters?.map((item, key) => {
                  return (
                    <div className="col-12 col-sm-6 col-md-4 mb-4 mt-1" key={key}>
                      <div className="h-100 border p-3 p-lg-4">
                        <h6 className="font-base">{item.title}</h6>
                        <p className="font-normal">{item?.address}</p>
                        <div className="row mx-0 font-normal p-lg-1 mb-3">
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('header.city')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.city}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Timings')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.timings}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('car_service.phone')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.phone}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Fax')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.fax}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('common.Postal Code')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.postalCode}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('form.Email')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.email}
                          </div>
                          <div className="col-4 col-xl-3 text-muted px-0 pb-2">
                            {t('form.Category')}
                          </div>
                          <div className="col-8 col-xl-9 text-heading">
                            : {item.category}
                          </div>
                        </div>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="align-items-center d-flex font-normal font-weight-semibold text-primary"
                        >
                          <i className="font-xl icon-direction mr-2"></i>
                          {t('common.Get Direction')}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TabPane;
