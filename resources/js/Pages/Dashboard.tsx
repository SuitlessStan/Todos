import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Things to do :
                </h2>
            }
        >
            <Head title="Welcome" />

            <div className="py-12">
                
            </div>
        </AuthenticatedLayout>
    );
}
