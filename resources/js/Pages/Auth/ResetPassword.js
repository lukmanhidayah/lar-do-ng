import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.update"));
    };

    return (
        <Guest>
            <Head title="Reset Password | Sipelaku Sosial" />

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <Input
                    id="email"
                    name="Email"
                    type="email"
                    value={data.email}
                    handleChange={onHandleChange}
                />

                <Input
                    id="password"
                    name="Password"
                    required
                    type="password"
                    value={data.password}
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <Input
                    id="password_confirmation"
                    name="Confirm Password"
                    type="password"
                    required
                    value={data.password_confirmation}
                    handleChange={onHandleChange}
                />
                <Button className={'h-12 bg-primary-600 active:bg-primary-800 w-full text-white'} title="Reset Password" processing={processing} />
            </form>
        </Guest>
    );
}
