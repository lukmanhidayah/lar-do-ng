import React, { useEffect, useRef, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import CustomTextArea from "@/Components/CustomTextArea";
import CustomDatePicker from "@/Components/CustomDatePicker";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import CloseIcon from "@/Icon/CloseIcon";
import checkObject from "@/Utils/checkObject";
import Spinner from "@/Components/Spinner";
import PermissionIcon from "@/Icon/PermissionIcon";

import thumbnail from "@/Assets/Images/thumbnail.svg";
import { Inertia } from "@inertiajs/inertia";

export default function InputKegiatan(props) {
    const { data, setData, processing, reset } = useForm({
        foto: [],
        nama: "",
        deksripsi: "",
        jumlah: "",
        sasaran: "",
        tujuan: "",
        total_anggaran: "",
        maksud: "",
        narasumber: "",
        tempat: "",
        tanggal: "",
    });
    const [isNull, setIsNull] = useState(false);
    const refFoto = useRef(null);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [limitImage, setLimitImage] = useState(0);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const mock = false;
        if (mock) {
            setData((prevState) => ({
                ...prevState,
                nama: "Buka bersama",
                deksripsi: "Ini adalah kegiatan rutin buka bersama",
                jumlah: "1000",
                sasaran: "Maysarakat",
                tujuan: "Menjalin Silaturahmi",
                total_anggaran: 1000,
                maksud: "Meningkatkan kebersama",
                narasumber: "Ustad Jajang",
                tempat: "Stadiun Siliwangi",
                tanggal: new Date("2021-08-24T17:00:00.000Z"),
            }));
        }
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleChangeFile = (event) => {
        let files = event.target.files;
        let index = limitImage;
        console.log(event);
        if (files) {
            Array.from(files).map((file) => {
                index = index + 1;
                if (index < 6) {
                    setImages((prevState) => [file, ...prevState]);
                }
            });
            setLimitImage(index);
            Array.from(files).map((file) => URL.revokeObjectURL(file));
        }
    };

    const renderImageSource = (sourceImage) => {
        return sourceImage.map((image, index) => {
            return (
                <div key={index} className="relative w-52 h-52 border bg-white">
                    <img
                        src={URL.createObjectURL(image)}
                        className="w-full h-full"
                    />
                    <div
                        className="absolute right-1 top-1 cursor-pointer bg-white rounded-full shadow"
                        onClick={() => removeImage(index)}
                    >
                        <CloseIcon className="stroke-current text-red-600" />
                    </div>
                </div>
            );
        });
    };

    const removeImage = (index) => {
        URL.revokeObjectURL(images[index]);
        let splice = [...images];
        splice.splice(index, 1);
        setImages(splice);
        setLimitImage(splice.length);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsNull(false);
        const resultCheck = checkObject(
            data,
            "nama, deksripsi, jumlah, sasaran, tujuan, total_anggaran, maksud, narasumber, tempat, tanggal"
        );
        if (resultCheck.status == false || images.length == 0) {
            setIsNull(true);
        } else {
            console.log("masuk");
            // post(route("input-kegiatan"));
            Inertia.post(
                "input-kegiatan",
                {
                    ...data,
                    foto: images,
                },
                {
                    onSuccess: (_) => {
                        setIsSubmitSuccess(true);
                        reset();
                        setLimitImage(0);
                        setImages([]);
                    },
                    onError: (errors) => {
                        setErrors(errors);
                    },
                }
            );
        }
    };

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props.identity.logo}
        >
            {props.status_id != 5 && (
                <div className="fixed bg-black h-full w-full z-10 top-0 left-0 md:left-20 lg:left-0 bg-opacity-50 flex justify-center items-center">
                    <div className="-mt-32 bg-white px-2 md:px-10 py-10 w-2/3 md:1/2 lg:w-1/3 flex flex-col items-center justify-center rounded">
                        <div className="w-40 h-40 bg-blue-100 flex flex-col items-center justify-center rounded-full">
                            <PermissionIcon width={100} height={100} />
                        </div>
                        <div className="text-sm text-center mt-10">
                            <div className="text-lg font-bold text-primary-800">
                                Belum diizinkan.
                            </div>
                            Input kegiatan hanya dapat dilakukan ketika LKS
                            sudah disetujui.{" "}
                        </div>
                    </div>
                </div>
            )}
            {
                <div className="relative">
                    {Object.keys(errors).length > 0 && (
                        <div className="fixed top-24 right-6 z-100  bg-red-50 px-5 py-3 rounded shadow animate-bounce-in">
                            <div
                                className="absolute -right-1 -top-1 cursor-pointer bg-white rounded-full shadow"
                                onClick={() => setErrors([])}
                            >
                                <CloseIcon className="stroke-current text-red-600" />
                            </div>
                            <div className="font-medium font-bold text-red-600">
                                Notifikasi Error
                            </div>
                            <ul className="list-disc list-inside text-sm text-red-600">
                                {Object.keys(errors).map(function (key, index) {
                                    return <li key={index}>{errors[key]}</li>;
                                })}
                            </ul>
                        </div>
                    )}
                    {isSubmitSuccess && (
                        <div className="fixed top-24 right-6 z-100 max-w-sm bg-green-50 px-5 py-3 rounded shadow animate-bounce-in">
                            <div
                                className="absolute -right-1 -top-1 cursor-pointer bg-white rounded-full shadow"
                                onClick={() => setIsSubmitSuccess(false)}
                            >
                                <CloseIcon className="stroke-current text-green-600" />
                            </div>
                            <div className="font-medium font-bold text-green-600">
                                Notifikasi Sukses
                            </div>
                            <span className="text-sm text-green-600">
                                Anda telah berhasil melakukan input kegiatan.
                            </span>
                        </div>
                    )}
                </div>
            }

            <Head title="Dashboard | Sipelaku Sosial" />
            <div className="w-full h-full bg-red">
                <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                    <div className="flex flex-col lg:flex-row justify-between lg:py-0 py-4 w-full flex-1">
                        <div className="w-full py-0 lg:py-4 px-6">
                            <Input
                                id="nama"
                                name="Nama Program Kegiatan/Agenda"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.nama)}
                                value={data.nama}
                                handleChange={onHandleChange}
                            />
                            <CustomTextArea
                                id="deksripsi"
                                name="Deskripsi Kegiatan"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.deksripsi)}
                                value={data.deksripsi}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="jumlah"
                                name="Jumlah Peserta"
                                inputMode="numeric"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.jumlah)}
                                value={data.jumlah}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="sasaran"
                                name="Sasaran Kegaitan"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.sasaran)}
                                value={data.sasaran}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="tujuan"
                                name="Tujuan Kegiatan"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.tujuan)}
                                value={data.tujuan}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="total_anggaran"
                                name="Total Anggaran"
                                inputMode="numeric"
                                type="text"
                                required
                                isNull={
                                    isNull && isNullOrEmpty(data.total_anggaran)
                                }
                                value={data.total_anggaran}
                                handleChange={onHandleChange}
                            />
                        </div>
                        <div className="w-full py-0 lg:py-4 px-6 relative">
                            <Input
                                id="maksud"
                                name="Maksud Kegiatan"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.maksud)}
                                value={data.maksud}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="narasumber"
                                name="Nama Narasumber / Pemateri"
                                type="text"
                                required
                                isNull={
                                    isNull && isNullOrEmpty(data.narasumber)
                                }
                                value={data.narasumber}
                                handleChange={onHandleChange}
                            />
                            <Input
                                id="tempat"
                                name="Tempat Kegiatan"
                                type="text"
                                required
                                isNull={isNull && isNullOrEmpty(data.tempat)}
                                value={data.tempat}
                                handleChange={onHandleChange}
                            />
                            <CustomDatePicker
                                name="Tanggal Kegiatan"
                                id="tanggal"
                                required
                                isNull={isNull && isNullOrEmpty(data.tanggal)}
                                value={data.tanggal}
                                handleChange={onHandleChange}
                            />
                            <div className="block text-gray-900 text-base font-semibold mb-2">
                                Foto Kegiatan
                            </div>
                            <div
                                className={`relative flex items-center ${
                                    images.length > 0
                                        ? "justify-center"
                                        : "justify-start"
                                } p-3 pb-1 mb-6 border border-dashed ${
                                    isNull && images.length == 0
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } min-h-48 rounded overflow-hidden gap-6 flex-wrap`}
                            >
                                <input
                                    ref={refFoto}
                                    name="foto[]"
                                    className="hidden"
                                    type="file"
                                    onClick={(event) => {
                                        event.currentTarget.value = null;
                                    }}
                                    multiple={true}
                                    accept="image/jpg,image/png,image/jpeg"
                                    onChange={onHandleChangeFile}
                                />
                                {renderImageSource(images)}
                                {images.length < 5 && (
                                    <div
                                        onClick={() => refFoto.current.click()}
                                        className="w-52 h-52 bg-blue-10 rounded gap-y-2 flex-col cursor-pointer flex items-center justify-center border shadow-sm"
                                    >
                                        <img
                                            src={thumbnail}
                                            alt="thubmnail"
                                            className="w-16"
                                        />
                                        <p className="text-xs px-4 text-center text-gray-500">
                                            Maksimal 5 Foto dengan Ukuran 5Mb
                                            per foto.
                                        </p>
                                        <div className="border border-primary-800 py-1 px-2 rounded shadow text-primary-800 select-none font-bold ml-2">
                                            Pilih foto
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t justify-end w-full p-5">
                        <button
                            onClick={props.status_id != 5 ? null : onSubmit}
                            disabled={processing}
                            className={`flex items-center w-24 h-10 justify-center bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2 ${
                                processing && "opacity-75"
                            }`}
                        >
                            {processing ? (
                                <Spinner width={18} height={18} />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
