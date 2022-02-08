import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { loadAboutUsData } from '../apiService/apiService';
import { IAboutUsItem, IFooter } from "../models/models";
import Banner from '../components/banner';
import Layout from '../components/Layout';
import { store } from "../app/store";
import { getFooterAsync } from "../feature/footerSlice";

export interface IImage {
    id: number;
    name: string;
    url: string;
}
export interface IimageFormat {
    small: { url: string };
}

interface CustomProps {
    aboutus?: IAboutUsItem;
    locale: string;
    footerData: IFooter;
}

const Aboutus: NextPage<CustomProps> = (props: CustomProps) => {
    const data = props.aboutus;
    return (
        <Layout footerData={props.footerData}>

            <div className='mb-5'>
                {data?.banner && data?.banner?.length > 0 && (
                    <Banner banner={data?.banner?.[0]} />
                )}
            </div>

            {data?.aboutUsItem &&
                data?.aboutUsItem?.map((item, index) => {
                    return (
                        <div className='container mb-5' key={index}>
                            <div className='row align-items-center '>
                                <div className='col-lg-6 col-md-12 p-lg-0 text-lg-left mb-4'>
                                    <Image
                                        src={`${item.image?.url ?? "/"} `}
                                        width={715}
                                        height={366}
                                        alt=""
                                        className="img-fluid mr-5"
                                    />
                                </div>
                                <div className='col-lg-6 col-md-12 pl-lg-4 align-items-center d-lg-flex flex-wrap'
                                    dangerouslySetInnerHTML={{ __html: item?.content }}>
                                </div>
                            </div>
                        </div>
                    )
                })}
            <div>

            </div>
        </Layout>
    )
};

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
    await Promise.all([
        store.dispatch(getFooterAsync(locale)),
    ]);

    const aboutus = await loadAboutUsData(locale);
    const footer = store.getState().footer.data;
    if (!aboutus || !footer) {
        return {
            notFound: true,
            props: {},
            revalidate: 60,
        };
    } else {
        return {
            props: {
                ...(await serverSideTranslations(locale, ["common"])),
                locale: locale || null,
                aboutus: aboutus || null,
                footerData: footer || null
            },
            revalidate: 60,

        };
    }
};


export default Aboutus

