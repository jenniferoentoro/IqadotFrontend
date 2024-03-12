import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import IqadotLogo from "../../images/iqadot_logo_white 1.png";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../features/auth/authSlice.tsx";
import { useDispatch } from 'react-redux';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(loginState);

      if (response.accessToken) {
        localStorage.setItem("token", response.accessToken);
        const claims = jwtDecode(response.accessToken)
        localStorage.setItem("claims", JSON.stringify(claims));

        const user = claims.sub
        
        dispatch(
          setCredentials({
            user: user
          })
        )
        navigate("/import");
      } else {
        console.error("Access token not found in response:", response);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className=" h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="flex items-center lg:w-6/12 lg:rounded-l-lg lg:rounded-bl-lg main-color-iqadot">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">IQADOT</h4>
                    <p className="text-sm">
                      The Iqadot Kit Application stands as an innovative solution in the realm of knowledge management, designed to streamline and enhance your data import processes. This powerful tool redefines the way you assimilate information, making knowledge transfer swift, efficient, and intelligent.
                    </p>
                  </div>
                </div>
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img className="mx-auto w-48" src={IqadotLogo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">Welcome Back!</h4>
                    </div>

                    <form>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Email input--> */}
                      <TEInput type="text" label="Email" id="email" name="email" className="mb-4" value={loginState.email} onChange={handleInputChange}></TEInput>
                      {/* <!--Password input--> */}
                      <TEInput type="password" label="Password" id="password" name="password" className="mb-4" value={loginState.password} onChange={handleInputChange}></TEInput>
                      {/* error message */}
                      {/*<div className={"text-center mb-2 bg-red-500 p-1 rounded-lg" + {errorMessage == "" ? "" : ""}}>*/}
                      {/*  {errorMessage}*/}
                      {/*</div>*/}
                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            onClick={(event) => {
                              return handleSubmit(event);
                            }}
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        {/*<a href="#!">Forgot password?</a>*/}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
