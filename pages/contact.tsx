import React, { useState, useEffect } from 'react';
import type { NextPage } from "next";

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import classNames from 'classnames';
import TabPane from '../components/contact/TabPane';
import SliderBanner from '../components/slider-banner';
import ContactForm from '../components/contact/ContactForm';
import { api } from 'alg-ecom-frontend-core';
import { toastr } from 'react-redux-toastr';
import Link from 'next/link';
import { QuickAccessFormsTypes, RouteKeys } from '../route/route-keys';
import { productTypes } from '../components/build-vehicle/utils';
import ContainerFitLoader from '../components/loader/container-fit-loader';
import {
    loadContactUsPage
} from "../apiService/apiService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import { store } from "../app/store";
import { IFooter } from "../models/models";

interface SSRContactData {
    data: any;
    footerData: IFooter;
}

const ContactPage: NextPage<SSRContactData> = ({ data,
    footerData,
}: SSRContactData) => {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const [showTankyou, setShowThankyou] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string | undefined>(
        productTypes.automobiles
    );
    useEffect(() => {
        if (router.isReady) {
            const { type } = router.query
            if (type && type === productTypes.automobiles || type === productTypes.motorcycle || type === productTypes.powerproduct || type === productTypes.marine) {
                setSelectedTab(type)
            } else {
                setSelectedTab(productTypes.automobiles)
            }
        }
    }, [router.isReady])

    const [formloading, setFormLoading] = useState<boolean>();
    const onSubmit = async (contact: any) => {
        try {
            setFormLoading(true);
            const response = await api.quickAccess.ContactUs({
                ...contact,
            });
            if (response.responsecode === 200) {
                router.push(
                    `/${RouteKeys.QuickAccessThankYou.replace(
                        ':quickAccess',
                        QuickAccessFormsTypes.contact
                    )}`
                );
                // toastr.success('Success', 'Request saved successfully');
            } else {
                toastr.error('Error', response?.message);
            }
        } catch (error: any) {
            toastr.error('Error', error?.response?.data?.message);
        }
        finally {
            setFormLoading(false);
        }
    };

    return (
        <Layout footerData={footerData}>
            <div className="content-wrapper">
                {/* {data?.metaDetails && <MetaDetails metaDetails={data?.metaDetails} />} */}

                {data?.banner && (
                    <SliderBanner specs={[]} detail={data?.banner ?? []} landing />
                )}
                <div className="bg-gray py-5 position-relative">
                    {!showTankyou && (
                        <>
                            <div className="container py-lg-4 contact-form text-center">
                                <h4>{t('common.ENQUIRY FEEDBACK FORM')}</h4>
                                <p className="col-12 col-lg-8 col-xl-7  letter-spacing-sm mx-auto p-0 mb-4">
                                    {t('common.EnquirySubText')}
                                </p>
                                <ContactForm onSubmit={onSubmit} />
                            </div>
                            {formloading && <ContainerFitLoader />}
                        </>
                    )}
                    {showTankyou && (
                        <div className="thankyou-block py-5 text-center">
                            <div className="py-5">
                                <img src="/assets/images/power-products/thankyou-icon.svg" alt="thank you" className="mb-5" />
                                <h3 className="text-uppercase mb-3">
                                    {t('form.Thank you for the enquiry')}
                                </h3>
                                <p className="font-normal text-gray-700 mb-5">
                                    {t('form.Thank_You_Text1')}
                                </p>
                                <Link
                                    href={`/${RouteKeys.Home}`}
                                >
                                    <a
                                        onClick={() => setShowThankyou(false)}
                                        type="Link"
                                        className="btn btn-primary font-md px-5"
                                    >
                                        <span className="d-block px-sm-4">
                                            {t('form.BACK TO HOME')}
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-5 bg-white">
                    <div className="container py-lg-5 contact-details">
                        <h1 className="h1 text-center">{t('form.Reach to Us')}</h1>
                        <nav className="justify-content-center nav tab-nav mb-4">
                            {data?.autoMobiles && (
                                <a
                                    className={classNames({
                                        'nav-link px-0 mx-3 cursor-pointer hover-primary': true,
                                        active: selectedTab === productTypes.automobiles,
                                    })}
                                    onClick={() => setSelectedTab(productTypes.automobiles)}
                                >
                                    <span className="font-base font-weight-semibold">
                                        {t('common.automobiles')}
                                    </span>
                                </a>
                            )}
                            {data?.motorCycles && (
                                <a
                                    className={classNames({
                                        'nav-link px-0 mx-3 cursor-pointer hover-primary': true,
                                        active: selectedTab === productTypes.motorcycle,
                                    })}
                                    onClick={() => setSelectedTab(productTypes.motorcycle)}
                                >
                                    <span className="font-base font-weight-semibold">
                                        {t('common.motorcycles')}
                                    </span>
                                </a>
                            )}
                            {data?.powerProduct && (
                                <a
                                    className={classNames({
                                        'nav-link px-0 mx-3 cursor-pointer hover-primary': true,
                                        active: selectedTab === productTypes.powerproduct,
                                    })}
                                    onClick={() => setSelectedTab(productTypes.powerproduct)}
                                >
                                    <span className="font-base font-weight-semibold">
                                        {t('common.power_product')}
                                    </span>
                                </a>
                            )}
                            {data?.marine && (
                                <a
                                    className={classNames({
                                        'nav-link px-0 mx-3 cursor-pointer hover-primary': true,
                                        active: selectedTab === productTypes.marine,
                                    })}
                                    onClick={() => setSelectedTab(productTypes.marine)}
                                >
                                    <span className="font-base font-weight-semibold">
                                        {t('common.marine')}
                                    </span>
                                </a>
                            )}
                        </nav>
                        {data?.autoMobiles && selectedTab === productTypes.automobiles && (
                            <TabPane data={data?.autoMobiles} />
                        )}
                        {data?.motorCycles && selectedTab === productTypes.motorcycle && (
                            <TabPane data={data?.motorCycles} />
                        )}
                        {data?.powerProduct && selectedTab === productTypes.powerproduct && (
                            <TabPane data={data?.powerProduct} />
                        )}
                        {data?.autoMobiles && selectedTab === productTypes.marine && (
                            <TabPane data={data?.marine} />
                        )}
                    </div>
                </div>
                <a
                    href={`https://api.whatsapp.com/send/?phone=${process.env.WHATSAPP_NO}`}
                    target="_blank"
                    rel="noreferrer"
                    className="icon-whatsapp whatapp"
                >
                    <span className="path1"></span>
                    <span className="path2"></span>
                </a>
            </div>
        </Layout>

    );
};

export const getStaticProps = async ({ locale, locales }: any) => {
    const language = locale;
    var data = await loadContactUsPage(language);
    const footer = store.getState().footer.data;
    if (!data  || !footer) {
        return {
          notFound: true,
          props: {},
          revalidate: 1,
        };
      }
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            locale,
            locales,
            data,
            footerData: footer,
        },
    };
};



export default ContactPage;
