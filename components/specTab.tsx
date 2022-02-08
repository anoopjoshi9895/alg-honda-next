import React from "react";


interface CustomProps {
    specs: any;
}
const SpecTab = (props: CustomProps) => {
    return (
        <>
            <div className="shadow-sm bg-white rounded border spec-tab mb-2">
                <div className="spec-tab__head container-fluid py-3">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <h6 className="font-lg mb-0">{props.specs.attributeGroupName}</h6>
                        </div>
                        {/* <div className="col-4 text-right">
                            {!toggle ? (
                                <i className="icon-add cursor-pointer" onClick={() => setToggle(!toggle)}></i>
                            ) : (
                                <i className="icon-minus cursor-pointer font-sm" onClick={() => setToggle(!toggle)}></i>
                            )}
                        </div> */}
                    </div>
                </div>
                {/* {toggle && ( */}
                <div className="spec-tab__body container-fluid border-top">
                    <div className="row font-normal">
                        {/* <div className="col-12 bg-gray-100 py-2 font-weight-semibold text-dark">Capacity</div> */}
                        {props.specs.attrOptions.map((item: any, itemIdx: number) => {
                            return (
                                <>
                                    <div className="col-6 border-bottom border-right py-2"><div className="py-1">{item.attrName}</div></div>
                                    <div className="col-6 border-bottom pl-md-5 pl-4 py-2"><div className="py-1">{item.attrOptValue}</div></div>
                                </>
                            )
                        })}
                    </div>
                </div>
                {/* )} */}
            </div>
        </>
    );
};
export default SpecTab;