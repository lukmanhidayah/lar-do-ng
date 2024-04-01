import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function VerifyEmail({ errors }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <Guest>
            <Head title="Verifikasi Email | Sipelaku Sosial" />
            <div className="mb-4 text-sm text-gray-900">
                Terima kasih telah mendaftar! Sebelum dapat mengakses lebih
                jauh, silahkan Anda memverifikasi alamat email Anda dengan
                menekan tautan yang baru saja kami kirimkan melalui email kepada
                Anda. Jika Anda tidak menerima email tersebut, dengan senang
                hati kami akan mengirimkan email lainnya kepada Anda.
            </div>

            {errors.status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600 bg-green-100 py-2 px-3 rounded">
                    Tautan verifikasi baru telah dikirim ke alamat email yang
                    Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit}>
                <Button
                    className={
                        "h-12 bg-primary-600 active:bg-primary-800 w-full text-white"
                    }
                    title="Kirim ulang verifikasi email"
                    processing={processing}
                />

                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full font-bold border-2 border-primary-400 rounded py-2 text-primary-600 hover:text-primary-900"
                >
                    LOGOUT
                </Link>
            </form>
        </Guest>
    );
}
