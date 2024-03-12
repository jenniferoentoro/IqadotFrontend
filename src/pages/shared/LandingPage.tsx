import logo from "src/images/iqadot-light.png"

const LandingPage = () => {
    return (
        <div>
            <header className="mx-auto max-w-6xl px-8 xl:px-0">
                <nav className="relative z-20 flex shrink-0 items-center space-x-2 py-6">
                    <a href="#">
                        <div className="h-9 text-heading">
                            <img
                                src="src/images/iqadot-light.png"
                                alt="Your Alt Text Here"
                                style={{ width: '150px', height: 'auto' }}
                            />
                        </div>
                    </a>
                    <div className="flex-1"></div>
                </nav>
            </header>

            <main>
                {/* Hero section */}
                <section className="py-12 px-8 md:py-24 xl:px-0">
                    <div className="mx-auto max-w-6xl space-y-8 md:space-y-16">
                        <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
                            <h1 className="col-span-2 text-5xl font-semibold text-heading md:text-5xl md:leading-tight">
                                The Iqadot Kit Application stands as an innovative solution, designed to {" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-400">
                                 streamline and enhance your data import processes...
                                </span>
                            </h1>
                            <div>
                                <p className="text-2xl font-medium leading-10 italic">
                                    Easily connect Iqadot Kit to your data sources, whether they are cloud-based, on-premises, or a combination of both.
                                </p>
                                <a
                                    href="/login"
                                    className="mt-6 inline-flex items-center bg-gradient-to-r from-yellow-400 to-blue-500 text-xl font-medium px-4 py-2 rounded-full text-white"
                                >
                                    Login Now
                                    <svg
                                        className="w-5 h-5 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5l7 7-7 7"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <img
                                src="/assets/car-dashboard.jpeg"
                                alt=""
                                className="w-full rounded-3xl"
                            />
                        </div>
                    </div>
                </section>

                {/* For features */}
                {/*<section className="bg-layer-1 p-6 md:p-20">*/}
                {/*    <div className="mx-auto w-full max-w-6xl">*/}
                {/*        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">*/}
                {/*            <div className="rounded-3xl bg-layer-2 p-5 md:px-8 md:py-6">*/}
                {/*                <div className="inline-block rounded-2xl bg-layer-3 p-3">*/}
                {/*                    /!* Heroicon name: outline/user-circle *!/*/}
                {/*                    <svg*/}
                {/*                        fill="none"*/}
                {/*                        stroke="currentColor"*/}
                {/*                        viewBox="0 0 24 24"*/}
                {/*                        xmlns="http://www.w3.org/2000/svg"*/}
                {/*                        className="h-8 w-8 stroke-gradient gradient-sky"*/}
                {/*                    >*/}
                {/*                        <path*/}
                {/*                            strokeLinecap="round"*/}
                {/*                            strokeLinejoin="round"*/}
                {/*                            strokeWidth={2}*/}
                {/*                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"*/}
                {/*                        />*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*                <h3 className="mt-4 bg-gradient-to-r text-3xl font-semibold text-gradient gradient-sky">*/}
                {/*                    Problem.*/}
                {/*                </h3>*/}
                {/*                <h3 className="mt-2 text-3xl font-semibold text-heading">*/}
                {/*                    Identify the problem being solved. Stress how difficult things*/}
                {/*                    used to be.*/}
                {/*                </h3>*/}

                {/*                <svg*/}
                {/*                    className="mt-8 w-full fill-gradient gradient-sky md:mt-16"*/}
                {/*                    viewBox="0 0 495 305"*/}
                {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                {/*                >*/}
                {/*                    <path d="M0 24C0 10.7452 10.7452 0 24 0H471C484.255 0 495 10.7452 495 24V281C495 294.255 484.255 305 471 305H24C10.7452 305 0 294.255 0 281V24Z" />*/}
                {/*                </svg>*/}
                {/*            </div>*/}

                {/*            <div className="rounded-3xl bg-layer-2 p-5 md:px-8 md:py-6">*/}
                {/*                <div className="inline-block rounded-2xl bg-layer-3 p-3">*/}
                {/*                    /!* Heroicon name: outline/lightning-bolt *!/*/}
                {/*                    <svg*/}
                {/*                        fill="none"*/}
                {/*                        stroke="currentColor"*/}
                {/*                        viewBox="0 0 24 24"*/}
                {/*                        xmlns="http://www.w3.org/2000/svg"*/}
                {/*                        className="h-8 w-8 stroke-gradient gradient-peach"*/}
                {/*                    >*/}
                {/*                        <path*/}
                {/*                            strokeLinecap="round"*/}
                {/*                            strokeLinejoin="round"*/}
                {/*                            strokeWidth={2}*/}
                {/*                            d="M13 10V3L4 14h7v7l9-11h-7z"*/}
                {/*                        />*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*                <h3 className="mt-4 bg-gradient-to-r text-3xl font-semibold text-gradient gradient-peach">*/}
                {/*                    Solution.*/}
                {/*                </h3>*/}
                {/*                <h3 className="mt-2 text-3xl font-semibold text-heading">*/}
                {/*                    What solution does your app propose to aleviate the problem?*/}
                {/*                    Show it off.*/}
                {/*                </h3>*/}

                {/*                <svg*/}
                {/*                    className="mt-8 w-full fill-gradient gradient-peach md:mt-16"*/}
                {/*                    viewBox="0 0 495 305"*/}
                {/*                    xmlns="http://www.w3.org/2000/svg"*/}
                {/*                >*/}
                {/*                    <path d="M0 24C0 10.7452 10.7452 0 24 0H471C484.255 0 495 10.7452 495 24V281C495 294.255 484.255 305 471 305H24C10.7452 305 0 294.255 0 281V24Z" />*/}
                {/*                </svg>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>

        </div>
    );
};

export default LandingPage;
