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
            <div
                id="dashboard"
                className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50"
            >
                <div className="relative bottom-20 md:bottom-0 min-h-screen flex flex-col justify-center items-center flex-1 selection:bg-[#FF2D20] selection:text-white">
                    <main>
                        <div className="container flex justify-center items-center">
                            <h1 className="text-3xl md:text-5xl font-kiddosy text-white px-2 py-2 bg-indianred rounded">
                                Keep your head less busy
                            </h1>
                        </div>

                        <nav className="flex justify-center items-center gap-1 my-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-indianred rounded-md text-black transition focus:outline-none dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="bg-indianred rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-black focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-black/70 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="bg-indianred rounded-md px-3 py-2 text-white ring-1 ring-transparent transition hover:text-black focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-black/70 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </main>
                    <footer className="py-16 text-center text-sm text-black dark:text-white/70 absolute bottom-0">
                        Issam Production 2024
                    </footer>
                </div>
            </div>
        </>
    );
}
