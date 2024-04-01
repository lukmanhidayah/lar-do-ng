import React from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import logoSvg from "@/Assets/Images/logo.svg";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <Guest>
            <ValidationErrors errors={errors} />
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 bg-green-100 py-2 px-3 rounded">
                    {status}
                </div>
            )}

            <div className="mb-4 text-sm text-gray-800 leading-normal">
                Silahkan masukan email akun Anda, dan kami akan mengirimkan link
                reset password ke email tersebut.
            </div>

            <form onSubmit={submit}>
                <Input
                    type="text"
                    id="email"
                    name="Email"
                    required={true}
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />
                <Button className={'h-12 bg-primary-600 active:bg-primary-800 w-full text-white'} title="Kirim Reset Link" processing={processing} />
            </form>
        </Guest>
    );
}
