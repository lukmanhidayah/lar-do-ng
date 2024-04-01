import React, { useEffect, useState } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import rectangleSvg from "@/Assets/Images/login/rectangle.svg";
import overlayBottomSvg from "@/Assets/Images/login/overlayBottom.svg";
import overlayHeaderSvg from "@/Assets/Images/login/overlayHeader.svg";
import logoSvg from "@/Assets/Images/logo.svg";
import logoWhiteSvg from "@/Assets/Images/logo-white.svg";
import logoBandungSvg from "@/Assets/Images/logo-bandung.png";
import "@/Assets/Css/login.css";
import CloseIcon from "@/Icon/CloseIcon";

export default function Login({ status, canResetPassword }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        transform,
        clearErrors,
    } = useForm({
        email: "",
        password: "",
        remember: "",
        emailRegistration: "",
        passwordRegistration: "",
        confirmPasswordRegister: "",
        nomorHandphone: "",
        name: "",
    });

    const [isModalShow, setIsModalShow] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        await post(route("login"));
    };

    const submitRegister = (e) => {
        e.preventDefault();

        transform((data) => ({
            email: data.emailRegistration,
            name: data.name,
            password: data.passwordRegistration,
            password_confirmation: data.confirmPasswordRegister,
            nomor_handphone: data.nomorHandphone,
        }));

        post(route("register"));
    };

    const toggleModal = (e) => {
        e.preventDefault();
        clearErrors();
        setIsModalShow((prevState) => !prevState);
    };

    return (
        <div className="login-custom-container">
            <Head title="Login | Sipelaku Sosial" />
            <div className="login-left-container overflow-hidden">
                <div className="absolute bottom-0 right-0">
                    <img
                        className="select-none"
                        width="200px"
                        height="200px"
                        src={rectangleSvg}
                        alt="rectangle"
                    />
                </div>
                <div className="absolute bottom-0 left-0">
                    <img
                        draggable="false"
                        className="select-none"
                        width="600px"
                        height="200px"
                        src={overlayBottomSvg}
                        style={{ transform: "scaleX(-1)" }}
                        alt="overlayBottom"
                    />
                </div>
                <div className="absolute top-0 -right-1/2">
                    <img
                        draggable="false"
                        className="select-none"
                        width="1000px"
                        style={{ transform: "scaleX(-1)" }}
                        src={overlayHeaderSvg}
                        alt="overlayHeader"
                    />
                </div>

                {/* Content */}
                <div className="absolute top-1/4 z-10">
                    <div className="w-full flex justify-start items-center">
                        <img
                            draggable="false"
                            className="w-28 select-none mr-10"
                            src={logoBandungSvg}
                            alt="logo-bandung"
                        />
                        <img
                            draggable="false"
                            className="w-48 select-none"
                            src={logoWhiteSvg}
                            alt="logo-dinsos"
                        />
                    </div>
                    <div className="mt-10 md:w-4/5 lg:w-1/2">
                        <h2 className="font-bold text-2xl leading-6 mb-4 mt-16 text-white">
                            SiPelaku Sosial Kota Bandung
                        </h2>
                        <p className="text-gray-100 text-base">
                            Dinas Sosial Kota Bandung sebagai organisasi
                            perangkat pemerintah daerah yang bertanggungjawab
                            dan memiliki kewenangan dalam menyelenggarakan
                            pembangunan bidang kesejahteraan sosial di Kota
                            Bandung.
                        </p>
                    </div>
                </div>
            </div>
            <div className="login-right-container">
                <div className="flex md:hidden w-full  justify-end items-center">
                    <img
                        draggable="false"
                        className="w-5 select-none mr-3"
                        src={logoBandungSvg}
                        alt="logo-bandung"
                    />
                    <img
                        draggable="false"
                        className="w-10 select-none"
                        src={logoSvg}
                        alt="logo-dinsos"
                    />
                </div>
                <div className="relative w-full mb-6">
                    <h1 className="text-4xl font-bold leading-relaxed">
                        Login
                    </h1>
                    <p className="lg:w-2/3 text-sm leading-1 text-gray-800">
                        Aplikasi Pendaftaran Lembaga Kesejahteraan Sosial
                    </p>
                </div>
                <div className="relative w-full">
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-100 py-2 px-3 rounded">
                            {status}
                        </div>
                    )}
                    {!isModalShow && <ValidationErrors errors={errors} />}
                    <form onSubmit={submitLogin}>
                        <Input
                            id="email"
                            name="Email"
                            type="email"
                            required
                            handleChange={onHandleChange}
                        />
                        <Input
                            id="password"
                            name="Password"
                            type="password"
                            handleChange={onHandleChange}
                            required
                        />
                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    value={data.remember}
                                    handleChange={onHandleChange}
                                />

                                <span className="ml-2 text-sm text-gray-600 cursor-pointer">
                                    Biarkan saya tetap masuk
                                </span>
                            </label>
                        </div>
                        <Button
                            className={
                                "h-12 bg-primary-600 active:bg-primary-800 w-full text-white"
                            }
                            title="Masuk"
                            processing={processing}
                        />
                    </form>
                    <div className="flex flex-col items-center mt-5 md:mt-10 text-xs md:text-sm">
                        <p>
                            Belum memiliki akun?{" "}
                            <span
                                onClick={toggleModal}
                                className="text-blue-900 font-bold cursor-pointer"
                                id="registrationShow"
                            >
                                Daftar disni
                            </span>
                        </p>
                        <Link
                            href={route("password.request")}
                            className="text-blue-900 font-bold"
                        >
                            Lupa password
                        </Link>
                    </div>
                </div>
            </div>

            {/* Register */}
            <div
                onClick={toggleModal}
                className={`modal-container ${isModalShow && "flex"}`}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="animate-bounce-in w-5/6 lg:w-1/2 bg-white rounded shadow-lg overflow-auto fadeIn"
                    style={{ maxHeight: "95%" }}
                >
                    <div className="w-full h-full p-5 overflow-y-auto">
                        <div className="w-full flex justify-between items-center border-b border-gray-100 pb-4">
                            <div className="flex justify-start items-center">
                                <img
                                    draggable="false"
                                    className="w-10 select-none mr-3"
                                    src={logoBandungSvg}
                                    alt="logo-dinsos"
                                />
                                <img
                                    draggable="false"
                                    className="w-16 select-none"
                                    src={logoSvg}
                                    alt="logo-dinsos"
                                />
                            </div>
                            <button
                                onClick={toggleModal}
                                className="focus:outline-none"
                            >
                                <CloseIcon className="stroke-current text-red-500 w-6" />
                            </button>
                        </div>
                        <div className="w-full px-2 md:px-10 xl:px-32">
                            <div className="relative w-full mb-4">
                                <h1 className="text-2xl font-bold leading-relaxed text-center">
                                    Daftar
                                </h1>
                            </div>
                            <div className="relative w-full">
                                {isModalShow && (
                                    <ValidationErrors errors={errors} />
                                )}

                                <form onSubmit={submitRegister}>
                                    <Input
                                        id="emailRegistration"
                                        name="Email"
                                        type="email"
                                        required
                                        handleChange={onHandleChange}
                                    />
                                    <div className="md:flex justify-between gap-x-4">
                                        <Input
                                            id="passwordRegistration"
                                            name="Password"
                                            type="password"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                        <Input
                                            id="confirmPasswordRegister"
                                            name="Confirm Password"
                                            type="password"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                    </div>
                                    <Input
                                        id="nomorHandphone"
                                        name="Nomor Handphone"
                                        type="tel"
                                        required
                                        handleChange={onHandleChange}
                                    />
                                    <Input
                                        id="name"
                                        name="Nama Lengkap Yayasan"
                                        type="text"
                                        required
                                        handleChange={onHandleChange}
                                    />
                                    <Button
                                        className={
                                            "h-12 bg-primary-600 active:bg-primary-800 w-full text-white"
                                        }
                                        title="Daftar"
                                        processing={processing}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
