import React, { useEffect, useRef, useState } from "react";

import { Head } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/inertia-react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Dashboard from "@/Layouts/Dashboard";

export default function Beranda(props) {
    let timer = useRef(null).current;
    useEffect(() => {
        autoSlide(1);
    }, []);

    const [selectedBanner, setSelectedBanner] = useState(0);

    const autoSlide = (nextSlide) => {
        timer = setTimeout(() => {
            setSelectedBanner(nextSlide);
        }, 5000);
    };

    const onTransitionStart = (e) => {
        if (timer) {
            clearTimeout(timer);
        }

        autoSlide(e.nextIndex + 1);
    };

    const textButton = (statusId) => {
        if (statusId == 1) {
            return (
                <Link
                    href={route("profile")}
                    as="button"
                    className="bg-primary-600 text-white rounded shadow font-semibold py-2 px-6 w-full"
                >
                    Isi Persyaratan
                </Link>
            );
        } else if (statusId == 4) {
            return (
                <Link
                    href={route("profile")}
                    as="button"
                    className="bg-primary-600 text-white rounded shadow font-semibold py-2 px-6"
                >
                    Revisi permohonan
                </Link>
            );
        } else if (statusId == 2) {
            return (
                <Link
                    disabled
                    href={route("profile")}
                    as="button"
                    className="bg-none shadow-none font-bold text-sm text-gray-600 bg-primary-600 bg-opacity-5 rounded shadow font-semibold py-2 px-6 w-full"
                >
                    Menunggu Verifikasi Admin
                </Link>
            );
        } else if (statusId == 3) {
            return (
                <Link
                    disabled
                    href={route("profile")}
                    as="button"
                    className="bg-none shadow-none font-bold text-sm text-gray-600 bg-primary-600 bg-opacity-5 rounded shadow font-semibold py-2 px-6 w-full"
                >
                    Menunggu Persetujuan Kepala Dinas
                </Link>
            );
        }
        return null;
    };

    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify} imageUrl={props.identity.logo}>
            <Head title="Dashboard | Sipelaku Sosial" />
            <div className="w-full h-full bg-red">
                <div className="flex justify-between items-center w-full mb-2">
                    <div className="text-xl font-bold w-1/2">Beranda</div>
                </div>
                <div className="relative flex items-center justify-center w-full h-5/6 rounded overflow-hidden">
                    <AwesomeSlider
                        infinite={true}
                        selected={selectedBanner}
                        onTransitionStart={onTransitionStart}
                        className="aws-btn"
                        fillParent
                        animation="cubeAnimation"
                    >
                        <div
                            className="w-full h-full"
                            data-src="https://images.pexels.com/photos/10525086/pexels-photo-10525086.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000"
                        ></div>
                        <div
                            className="w-full h-full"
                            data-src="https://images.pexels.com/photos/10525085/pexels-photo-10525085.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000"
                        />
                        <div
                            className="w-full h-full"
                            data-src="https://images.pexels.com/photos/10525087/pexels-photo-10525087.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1000"
                        />
                    </AwesomeSlider>
                </div>
                <div className="py-2 flex w-full justify-center">{textButton(props.statusId)}</div>
            </div>
        </Dashboard>
    );
}
