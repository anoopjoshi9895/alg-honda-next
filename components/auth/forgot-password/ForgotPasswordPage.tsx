import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RouteKeys } from "../../../utils/route-keys";
import ForgotPassword from "./ForgotPassword";
import Image from "next/image";
interface CustomProps {
  popup: boolean;
}

const ForgotPasswordPage: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  const router = useRouter();

  const onReset = () => {
    router.push(`${RouteKeys.Auth}`);
  };
  return (
    <>
      <div
        className={`account-outer py-5 ${!props.popup ? "bg-gray-300" : ""}`}
      >
        <div className={`container ${!props.popup ? "" : "p-0"}`}>
          <div className="text-center mb-4 pb-2">
            {!props.popup && (
              <Link href={`${RouteKeys.Home}`} passHref>
                <Image
                  src={require("styles/images/logo.png")}
                  alt="honda"
                  className="img-fluid"
                  width={136}
                  height={44}
                />
              </Link>
            )}
          </div>

          <div className="account-box bg-white px-3 py-4">
            <div className="account-box-inner">
              <div className="account-tab-container py-4">
                <ForgotPassword onReset={onReset} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
