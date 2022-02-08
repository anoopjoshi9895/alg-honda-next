import React from 'react';

interface CustomProps {
    specs: any;
}

const SpecTab: React.FunctionComponent<CustomProps> = (props: CustomProps) => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    return (
        <>
            <div className="shadow-sm bg-white rounded border spec-tab mb-2">
                <div className="spec-tab__head container-fluid py-3">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h6 className="font-lg mb-0">
                                {/* {props.specs.attributeGroupName} */}Specs
                                </h6>
                        </div>
                        
                    </div>
                </div>
                <div className="spec-tab__body container-fluid border-top">
                    <div className="row font-normal">
                        {props.specs.map((item: any, itemIdx: number) => {
                            return (
                                <>
                                    {/* <div className="col-6 border-bottom border-right py-2"><div className="py-1">{item.attrName}</div></div>
                                    <div className="col-6 border-bottom pl-md-5 pl-4 py-2"><div className="py-1">{item.attrOptValue}</div></div> */}
                                    <div className="col-6 border-bottom border-right py-2"><div className="py-1">{item.label}</div></div>
                                    <div className="col-6 border-bottom pl-md-5 pl-4 py-2"><div className="py-1">{item.value}</div></div>
                                </>
                            )
                        })}
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    )
}

export default SpecTab;