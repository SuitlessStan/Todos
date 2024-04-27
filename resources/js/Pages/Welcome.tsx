import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <svg
                                    className="bg-white text-white size-36"
                                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:cc="http://creativecommons.org/ns#"
                                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                                    xmlns:svg="http://www.w3.org/2000/svg"
                                    id="svg4046"
                                    viewBox="0 0 66.4 81.363"
                                    version="1.0"
                                >
                                    <g
                                        id="layer1"
                                        transform="translate(-372.51 -568.82)"
                                    >
                                        <g
                                            id="g4036"
                                            stroke-linejoin="round"
                                            transform="translate(-10.975 39.978)"
                                        >
                                            <path
                                                id="path4008"
                                                d="m388.15 530.07c-3.73 0.72-3.29 2.41-3.66 3.91l1.77 71.54c-0.08 2.18 0.46 3.79 3.02 3.53l54.52 0.16c1.88-0.31 3.43-1.07 3.56-3.82l1.53-72.41c-0.18-3.22-2.16-3.1-4.06-3.13l-56.68 0.22z"
                                                stroke="#000"
                                                stroke-linecap="round"
                                                stroke-width="2"
                                                fill="none"
                                            />
                                            <path
                                                id="path4010"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m392.76 545.62v12.29l11.91-0.49 1.04-11.31-12.95-0.49z"
                                            />
                                            <path
                                                id="path4012"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m410.63 554.23l31.81-0.42"
                                            />
                                            <path
                                                id="path4016"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m409.32 571.7h31.8"
                                            />
                                            <path
                                                id="path4020"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m409.92 589.7l31.71 0.3"
                                            />
                                            <path
                                                id="path4030"
                                                stroke="#f00"
                                                fill-opacity=".99219"
                                                fill="#f00"
                                                d="m396.46 549.43l-1.23 1.02 3.54 4.28 10.75-9.48-1.85-1.91-8.67 8.64-2.54-2.55z"
                                            />
                                            <path
                                                id="path4032"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m392.89 563.1v12.29l11.92-0.49 1.03-11.3-12.95-0.5z"
                                            />
                                            <path
                                                id="path4034"
                                                stroke="#000"
                                                fill-opacity=".99219"
                                                fill="#fff"
                                                d="m393.39 581.54v12.29l11.92-0.49 1.04-11.31-12.96-0.49z"
                                            />
                                        </g>
                                    </g>
                                    <metadata>
                                        <rdf:RDF>
                                            <cc:Work>
                                                <dc:format>
                                                    image/svg+xml
                                                </dc:format>
                                                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                                                <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/" />
                                                <dc:publisher>
                                                    <cc:Agent rdf:about="http://openclipart.org/">
                                                        <dc:title>
                                                            Openclipart
                                                        </dc:title>
                                                    </cc:Agent>
                                                </dc:publisher>
                                                <dc:title>
                                                    Liste / List
                                                </dc:title>
                                                <dc:date>
                                                    2010-03-22T21:03:32
                                                </dc:date>
                                                <dc:description>
                                                    clip art, clipart, line art,
                                                    list, note, office, outline,
                                                    todo,{" "}
                                                </dc:description>
                                                <dc:source>
                                                    http://openclipart.org/detail/33265/liste-/-list-by-lmproulx
                                                </dc:source>
                                                <dc:creator>
                                                    <cc:Agent>
                                                        <dc:title>
                                                            lmproulx
                                                        </dc:title>
                                                    </cc:Agent>
                                                </dc:creator>
                                                <dc:subject>
                                                    <rdf:Bag>
                                                        <rdf:li>
                                                            clip art
                                                        </rdf:li>
                                                        <rdf:li>clipart</rdf:li>
                                                        <rdf:li>
                                                            line art
                                                        </rdf:li>
                                                        <rdf:li>list</rdf:li>
                                                        <rdf:li>note</rdf:li>
                                                        <rdf:li>office</rdf:li>
                                                        <rdf:li>outline</rdf:li>
                                                        <rdf:li>todo</rdf:li>
                                                    </rdf:Bag>
                                                </dc:subject>
                                            </cc:Work>
                                            <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/">
                                                <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" />
                                                <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" />
                                                <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" />
                                            </cc:License>
                                        </rdf:RDF>
                                    </metadata>
                                </svg>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6"></main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Issam Production 2024
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
