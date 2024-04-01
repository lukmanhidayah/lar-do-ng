import React, { useState, useCallback, useEffect, useRef } from "react";
import Dashboard from "@/Layouts/Dashboard";
import Input from "@/Components/Input";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Stepper, Step } from "react-form-stepper";
import SelectOption from "@/Components/SelectOption";
import UploadIcon from "@/Icon/UploadIcon";
import ToRightIcon from "@/Icon/ToRightIcon";
import CustomTextArea from "@/Components/CustomTextArea";
import "@/Assets/Css/my-table.css";
import CustomDatePicker from "@/Components/CustomDatePicker";
import axios from "axios";
import config from "@/config";
import CloseIcon from "@/Icon/CloseIcon";
import checkObject from "@/Utils/checkObject";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import Spinner from "@/Components/Spinner";
import { Modal } from "@/Components/Dashboard/Modal";
import { mockProfile, mockProfileFile } from "@/Utils/mockData";
import { initData } from "@/Utils/initData";
import ArrowDownIcon from "@/Icon/ArrowDownIcon";
import DropZone from "@/Components/DropZone";
import isOneWeekBefore from "@/Utils/isOneWeekBefore";
import ToLeftIcon from "@/Icon/ToLeftIcon";
import DokumenCmp from "@/Components/Profile/DokumenCmp";
import pointerStep from "@/Utils/pointerStep";
import AfterRegister from "@/Components/Profile/AfterRegister";

const Profile = (props) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        transform,
        wasSuccessful,
        clearErrors,
    } = useForm({
        ...initData,
        noReg: props.identity.no_reg,
        name: props.auth.user.name,
    });

    const refContainer = useRef(null);

    const dataProps = {
        noReg: props.identity.no_reg,
        name: props.auth.user.name,
        singkatan_yayasan: props.identity.singkatan_yayasan || "",
        alamat: props.address.alamat || "",
        kecamatan_id: props.address.kecamatan_id
            ? {
                  value: props.address.kecamatan_id,
                  label: props.address.kecamatan_label,
              }
            : "",
        kelurahan_id: props.address.kelurahan_id
            ? {
                  value: props.address.kelurahan_id,
                  label: props.address.kelurahan_label,
              }
            : "",
        rt: props.address.rt || "",
        rw: props.address.rw || "",
        fax: props.identity.fax || "",
        website: props.identity.website || "",
        logo: props.identity.logo || "",
        visi: props.identity.visi || "",
        misi: props.identity.misi,
        tujuan: props.identity.tujuan,
        posisi_id: props.identity.posisi_id
            ? {
                  value: props.identity.posisi_id,
                  label: props.identity.posisi_label,
              }
            : "",
        lingkup_id: props.identity.lingkup_id
            ? {
                  value: props.identity.lingkup_id,
                  label: props.identity.lingkup_label,
              }
            : "",
        lks_status_id: props.identity.lks_status_id
            ? {
                  value: props.identity.lks_status_id,
                  label: props.identity.lks_status_label,
              }
            : "",
        type_rehab_id: props.identity.type_rehab_id
            ? {
                  value: props.identity.type_rehab_id,
                  label: props.identity.type_rehab_label,
              }
            : "",
        tempat_pendirian: props.identity.tempat_pendirian || "",
        tanggal_pendirian: props.identity.tanggal_pendirian
            ? new Date(props.identity.tanggal_pendirian)
            : "",
        ketua: props.identity.ketua || "",
        sekretaris: props.identity.sekretaris || "",
        bendahara: props.identity.bendahara || "",
        notaris: props.identity.notaris || "",
        tanggal_akta: props.identity.tanggal_akta
            ? new Date(props.identity.tanggal_akta)
            : "",
        nomor_akta: props.identity.nomor_akta || "",
        nomor_pengesahan: props.identity.nomor_pengesahan || "",
        keterangan_domisili: props.identity.keterangan_domisili || "",
        npwp: props.identity.npwp || "",
        bank_id: props.identity.bank_id
            ? {
                  value: props.identity.bank_id,
                  label: props.identity.bank_label,
              }
            : "",
        nomor_rekening: props.identity.nomor_rekening || "",
        nama_pemilik_rekening: props.identity.sekretaris || "",

        file_akta_pendirian: isNullOrEmpty(
            props.comment?.comment_file_akta_pendirian
        )
            ? props?.document?.file_akta_pendirian
            : null,
        file_izin_pendirian: isNullOrEmpty(
            props.comment?.comment_file_izin_pendirian
        )
            ? props?.document?.file_izin_pendirian
            : null,
        file_adart: isNullOrEmpty(props.comment?.comment_file_adart)
            ? props?.document?.file_adart
            : null,
        file_susunan_pengurus: isNullOrEmpty(
            props.comment?.comment_file_susunan_pengurus
        )
            ? props?.document?.file_susunan_pengurus
            : null,
        file_surat_domisili: isNullOrEmpty(
            props.comment?.comment_file_surat_domisili
        )
            ? props?.document?.file_surat_domisili
            : null,
        file_npwp: isNullOrEmpty(props.comment?.comment_file_npwp)
            ? props?.document?.file_npwp
            : null,
        file_laporan_kegiatan: isNullOrEmpty(
            props.comment?.comment_file_laporan_kegiatan
        )
            ? props?.document?.file_laporan_kegiatan
            : null,
        file_data_klien: isNullOrEmpty(props.comment?.comment_file_data_klien)
            ? props?.document?.file_data_klien
            : null,
        foto_plang_yayasan: isNullOrEmpty(
            props.comment?.comment_foto_plang_yayasan
        )
            ? props?.document?.foto_plang_yayasan
            : null,
        file_visi_misi: isNullOrEmpty(props.comment?.comment_file_visi_misi)
            ? props?.document?.file_visi_misi
            : null,
        file_proker: isNullOrEmpty(props.comment?.comment_file_proker)
            ? props?.document?.file_proker
            : null,
    };

    const refLogo = useRef(null);

    const [activeStep, setActiveStep] = useState(
        pointerStep(props.identity.status_id, props?.comment)
    );
    const [status, setStatus] = useState(props.identity.status_id);
    const [detailRevisi, setDetailRevisi] = useState(true);
    const [optionKecamatan] = useState(props.kecamatans);
    const [optionKelurahan, setOptionKelurahan] = useState([]);
    const [isNull, setIsNull] = useState(false);
    const [tempFile, setTempFile] = useState({
        logo: null,
        file_akta_pendirian: null,
        file_izin_pendirian: null,
        file_adart: null,
        file_susunan_pengurus: null,
        file_surat_domisili: null,
        file_npwp: null,
        file_laporan_kegiatan: null,
        file_data_klien: null,
        foto_plang_yayasan: null,
        file_visi_misi: null,
        file_proker: null,
    });
    const [isChangeFile, setIsChangeFile] = useState({
        logo: false,
        file_akta_pendirian: false,
        file_izin_pendirian: false,
        file_adart: false,
        file_susunan_pengurus: false,
        file_surat_domisili: false,
        file_npwp: false,
        file_laporan_kegiatan: false,
        file_data_klien: false,
        foto_plang_yayasan: false,
        file_visi_misi: false,
        file_proker: false,
    });
    const [errorSubmit, setErrorSubmit] = useState({});
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [srcFileViewer, setSrcFileViewer] = useState(null);

    const makeModalShow = (data) => {
        setShowModal(true);
        setTimeout(() => {
            setSrcFileViewer(data);
        }, 1000);
    };

    const onNextStep = () => {
        setActiveStep((prevState) => prevState + 1);
        refContainer.current.scrollIntoView();
    };

    const onPrevStep = () => {
        setActiveStep((prevState) => prevState - 1);
        refContainer.current.scrollIntoView();
    };

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleChangeFile = (event) => {
        if (!isNullOrEmpty(event.target.files[0])) {
            if (
                status == 4 ||
                status == 6 ||
                (status == 5 && isOneWeekBefore(props.identity.tanggal_expire))
            ) {
                setIsChangeFile((prevState) => ({
                    ...prevState,
                    [event.target.name]: true,
                }));
            }
            setTempFile((prevState) => ({
                ...prevState,
                [event.target.name]: URL.createObjectURL(event.target.files[0]),
            }));
            setData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.files[0],
            }));
        }
    };

    const removeImage = (name) => {
        setTempFile(name, null);
        setData(name, null);
    };

    useEffect(() => {
        let mock = false;
        if (mock) {
            setMock();
        } else {
            assignData();
        }
    }, []);

    useEffect(() => {
        setErrorSubmit(errors);
    }, [errors]);

    useEffect(() => {
        if (wasSuccessful) {
            setIsSubmitSuccess(wasSuccessful);
            setStatus(2);
        }
    }, [wasSuccessful]);

    useEffect(() => {
        if (data.kecamatan_id != "") {
            setData("kelurahan_id", null);
            axios
                .get(
                    config.base_url + `/kelurahan/${data.kecamatan_id.value}`,
                    {
                        auth: {
                            username: "sipelaku",
                            password: "d1ns0sBDG2020",
                        },
                    }
                )
                .then((res) => {
                    setOptionKelurahan(res.data.data);
                });
        }
    }, [data.kecamatan_id]);

    const assignData = () => {
        setData((prevState) => ({
            ...prevState,
            ...dataProps,
        }));
        setTempFile((prevState) => ({
            ...prevState,
            logo: dataProps.logo ? config.drive_url + dataProps.logo : null,
            file_akta_pendirian: dataProps.file_akta_pendirian
                ? config.drive_url + dataProps.file_akta_pendirian
                : null,
            file_izin_pendirian: dataProps.file_izin_pendirian
                ? config.drive_url + dataProps.file_izin_pendirian
                : null,
            file_adart: dataProps.file_adart
                ? config.drive_url + dataProps.file_adart
                : null,
            file_susunan_pengurus: dataProps.file_susunan_pengurus
                ? config.drive_url + dataProps.file_susunan_pengurus
                : null,
            file_surat_domisili: dataProps.file_surat_domisili
                ? config.drive_url + dataProps.file_surat_domisili
                : null,
            file_npwp: dataProps.file_npwp
                ? config.drive_url + dataProps.file_npwp
                : null,
            file_laporan_kegiatan: dataProps.file_laporan_kegiatan
                ? config.drive_url + dataProps.file_laporan_kegiatan
                : null,
            file_data_klien: dataProps.file_data_klien
                ? config.drive_url + dataProps.file_data_klien
                : null,
            foto_plang_yayasan: dataProps.foto_plang_yayasan
                ? config.drive_url + dataProps.foto_plang_yayasan
                : null,
            file_visi_misi: dataProps.file_visi_misi
                ? config.drive_url + dataProps.file_visi_misi
                : null,
            file_proker: dataProps.file_proker
                ? config.drive_url + dataProps.file_proker
                : null,
        }));
        if (!isNullOrEmpty(dataProps.kelurahan_id)) {
            setTimeout(() => {
                setData((prevState) => ({
                    ...prevState,
                    kelurahan_id: {
                        value: props.address.kelurahan_id,
                        label: props.address.kelurahan_label,
                    },
                }));
            }, 1000);
        }
    };

    const checkDataPerSlide = (keyOfData) => {
        const resultCheck = checkObject(data, keyOfData);
        setIsNull(false);
        if (resultCheck.status == false) {
            setIsNull(true);
        } else {
            onNextStep();
        }
    };

    transform((data) => ({
        ...data,
        bank_id: data.bank_id.value,
        kecamatan_id: data.kecamatan_id.value,
        kelurahan_id: data.kelurahan_id.value,
        lingkup_id: data.lingkup_id.value,
        posisi_id: data.posisi_id.value,
        lks_status_id: data.lks_status_id.value,
        type_rehab_id: data.type_rehab_id.value,
    }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsNull(false);
        const resultCheck = checkObject(
            data,
            "file_akta_pendirian, file_izin_pendirian, file_adart, file_susunan_pengurus, file_surat_domisili, file_npwp, file_laporan_kegiatan, file_data_klien, foto_plang_yayasan, file_visi_misi, file_proker"
        );
        if (resultCheck.status == false) {
            setIsNull(true);
        } else {
            if (
                status == 4 ||
                status == 6 ||
                (status == 5 && isOneWeekBefore(props.identity.tanggal_expire))
            ) {
                Inertia.post(
                    "edit-permohonan",
                    {
                        ...data,
                        bank_id: data.bank_id.value,
                        kecamatan_id: data.kecamatan_id.value,
                        kelurahan_id: data.kelurahan_id.value,
                        lks_status_id: data.lks_status_id.value,
                        type_rehab_id: data.type_rehab_id.value,
                        lingkup_id: data.lingkup_id.value,
                        posisi_id: data.posisi_id.value,
                        is_change_logo: isChangeFile.logo,
                        is_change_file_akta_pendirian:
                            isChangeFile.file_akta_pendirian,
                        is_change_file_izin_pendirian:
                            isChangeFile.file_izin_pendirian,
                        is_change_file_adart: isChangeFile.file_adart,
                        is_change_file_susunan_pengurus:
                            isChangeFile.file_susunan_pengurus,
                        is_change_file_surat_domisili:
                            isChangeFile.file_surat_domisili,
                        is_change_file_npwp: isChangeFile.file_npwp,
                        is_change_file_laporan_kegiatan:
                            isChangeFile.file_laporan_kegiatan,
                        is_change_file_data_klien: isChangeFile.file_data_klien,
                        is_change_foto_plang_yayasan:
                            isChangeFile.foto_plang_yayasan,
                        is_change_file_visi_misi: isChangeFile.file_visi_misi,
                        is_change_file_proker: isChangeFile.file_proker,
                    },
                    {
                        onSuccess: (_) => {
                            window.location.href = "profile";
                        },
                        onError: (errors) => {
                            setErrorSubmit(errors);
                        },
                    }
                );
            } else {
                post(route("user-permohonan"));
            }
        }
    };

    const setMock = async () => {
        setData((prevState) => ({
            ...prevState,
            ...mockProfile,
        }));
        const profileFile = await mockProfileFile();
        profileFile.forEach(async (res, index) => {
            onHandleChangeFile(res);
        });

        setTimeout(() => {
            setData((prevState) => ({
                ...prevState,
                kelurahan_id: { value: 3273020002, label: "CIRANGRANG" },
            }));
        }, 1000);
    };

    const toogleRevisi = () => {
        setDetailRevisi((prevState) => !prevState);
    };

    const renderForm = useCallback(() => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        {!isNullOrEmpty(props.comment?.comment_data_umum) && (
                            <div className="bg-gray-200 p-4 rounded-t">
                                <p className="text-red-600">
                                    <b>Catatan: </b>
                                    {props.comment?.comment_data_umum}
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row justify-between lg:py-2 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <Input
                                    id="noReg"
                                    name="Nomor Registrasi LKS"
                                    type="text"
                                    disable
                                    value={data.noReg}
                                    required
                                />
                                <Input
                                    id="name"
                                    name="Nama Lengkap LKS"
                                    disable
                                    type="text"
                                    isNull={isNull && isNullOrEmpty(data.name)}
                                    value={data.name}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="singkatan_yayasan"
                                    name="Singkatan Nama LKS"
                                    type="text"
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.singkatan_yayasan)
                                    }
                                    value={data.singkatan_yayasan}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="alamat"
                                    name="Alamat Sekretariat"
                                    value={data.alamat}
                                    isNull={
                                        isNull && isNullOrEmpty(data.alamat)
                                    }
                                    handleChange={onHandleChange}
                                    placeholder="Jalan/nomor/blok"
                                    type="text"
                                    required
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <SelectOption
                                        id="kecamatan_id"
                                        name="Kecamatan"
                                        className="w-full"
                                        placeholder={"Pilih Kecamatan..."}
                                        required
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.kecamatan_id)
                                        }
                                        options={optionKecamatan}
                                        value={data.kecamatan_id}
                                        handleChange={onHandleChange}
                                    />
                                    <SelectOption
                                        id="kelurahan_id"
                                        name="Kelurahan"
                                        placeholder={"Pilih Kelurahan..."}
                                        required
                                        className="w-full"
                                        isDisabled={optionKelurahan.length == 0}
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.kelurahan_id)
                                        }
                                        options={optionKelurahan}
                                        value={data.kelurahan_id}
                                        handleChange={onHandleChange}
                                    />
                                    <Input
                                        id="rt"
                                        inputMode="numeric"
                                        name="RT"
                                        type="text"
                                        placeholder={"001"}
                                        maxLength={3}
                                        required
                                        isNull={
                                            isNull && isNullOrEmpty(data.rt)
                                        }
                                        value={data.rt}
                                        handleChange={onHandleChange}
                                    />
                                    <Input
                                        id="rw"
                                        name="RW"
                                        maxLength={3}
                                        placeholder={"001"}
                                        inputMode="numeric"
                                        isNull={
                                            isNull && isNullOrEmpty(data.rw)
                                        }
                                        type="text"
                                        value={data.rw}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <Input
                                    id="telepon"
                                    name="Telepon / HP"
                                    type="text"
                                    disable
                                    value={props.identity.nomor_handphone}
                                    required
                                />
                                <Input
                                    id="fax"
                                    name="Fax"
                                    inputMode="numeric"
                                    type="text"
                                    handleChange={onHandleChange}
                                    value={data.fax}
                                />
                                <Input
                                    id="email"
                                    name="Email"
                                    type="text"
                                    disable
                                    value={props.auth.user.email}
                                    required
                                />
                                <Input
                                    id="website"
                                    name="Situs / Website LKS"
                                    value={data.website}
                                    placeholder={"https://www.example.com"}
                                    handleChange={onHandleChange}
                                    type="text"
                                />
                                <div className="block text-gray-900 text-base font-semibold mb-2">
                                    Logo LKS
                                </div>
                                <div
                                    className={`relative flex flex-col items-center justify-center p-3 pb-1 mb-6 border border-dashed ${
                                        isNull && isNullOrEmpty(data.logo)
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } h-48 rounded overflow-hidden`}
                                >
                                    {data.logo ? (
                                        <>
                                            <img
                                                src={tempFile.logo}
                                                className="max-w-full max-h-full"
                                            />
                                            <div
                                                className="absolute right-1 top-1 cursor-pointer bg-white rounded-full shadow"
                                                onClick={() =>
                                                    removeImage("logo")
                                                }
                                            >
                                                <CloseIcon className="stroke-current text-red-600" />
                                            </div>
                                        </>
                                    ) : (
                                        <DropZone
                                            name="logo"
                                            onDrop={onHandleChangeFile}
                                        >
                                            <input
                                                ref={refLogo}
                                                className="hidden"
                                                name="logo"
                                                type="file"
                                                multiple={false}
                                                accept="image/jpg,image/png,image/jpeg"
                                                onChange={onHandleChangeFile}
                                                // {...getInputProps()}
                                            />
                                            <UploadIcon />
                                            <div className="font-semibold text-gray-300 text-md m-2 text-center">
                                                Tarik dan letakan file
                                                PNG/JPG/JPEG di sini
                                                <br />
                                                (Ukuran maksimal: 5MB)
                                            </div>
                                            <div className="font-semibold text-md mb-2">
                                                atau{" "}
                                                <button
                                                    onClick={() =>
                                                        refLogo.current.click()
                                                    }
                                                    className="bg-primary-600 active:bg-primary-800 py-1 px-2 rounded shadow text-white font-bold ml-2"
                                                >
                                                    Cari file
                                                </button>
                                            </div>
                                        </DropZone>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t justify-end w-full p-5">
                            <button
                                onClick={() =>
                                    checkDataPerSlide(
                                        "name, singkatan_yayasan, alamat, kecamatan_id, kelurahan_id, rt, rw, logo"
                                    )
                                }
                                className="flex items-center bg-primary-600 h-10 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2"
                            >
                                Selanjutnya{" "}
                                <ToRightIcon className="stroke-current text-gray-100 w-5 ml-2" />
                            </button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        {!isNullOrEmpty(
                            props.comment?.comment_data_identitas
                        ) && (
                            <div className="bg-gray-200 p-4 rounded-t">
                                <p className="text-red-600">
                                    <b>Catatan: </b>
                                    {props.comment?.comment_data_identitas}
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row justify-between lg:py-0 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <CustomTextArea
                                    id="visi"
                                    name="Visi LKS"
                                    type="text"
                                    value={data.visi}
                                    isNull={isNull && isNullOrEmpty(data.visi)}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <CustomTextArea
                                    id="misi"
                                    name="Misi LKS"
                                    value={data.misi}
                                    isNull={isNull && isNullOrEmpty(data.misi)}
                                    type="text"
                                    handleChange={onHandleChange}
                                    required
                                />
                                <CustomTextArea
                                    id="tujuan"
                                    name="Tujuan LKS"
                                    type="text"
                                    value={data.tujuan}
                                    isNull={
                                        isNull && isNullOrEmpty(data.tujuan)
                                    }
                                    handleChange={onHandleChange}
                                    required
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <SelectOption
                                        id={"posisi_id"}
                                        name="Kedudukan LKS"
                                        className="w-full"
                                        value={data.posisi_id}
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.posisi_id)
                                        }
                                        options={props.positions}
                                        placeholder={"Kedudukan LKS.."}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    <SelectOption
                                        id="lingkup_id"
                                        name="Lingkup Kerja"
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.lingkup_id)
                                        }
                                        className="w-full"
                                        options={props.scopes}
                                        value={data.lingkup_id}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <SelectOption
                                        id={"lks_status_id"}
                                        name="Status LKS"
                                        className="w-full"
                                        value={data.lks_status_id}
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.lks_status_id)
                                        }
                                        options={props.lksStatus}
                                        placeholder={"Status LKS.."}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                    <SelectOption
                                        id="type_rehab_id"
                                        name="Jenis Penyelenggaraan Kesos"
                                        isNull={
                                            isNull &&
                                            isNullOrEmpty(data.type_rehab_id)
                                        }
                                        className="w-full"
                                        options={props.typeRehabs}
                                        value={data.type_rehab_id}
                                        handleChange={onHandleChange}
                                        placeholder={"Jenis Penyelenggaraan..."}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <Input
                                    id="tempat_pendirian"
                                    name="Tempat Pendirian LKS"
                                    placeholder="Nama Kota..."
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.tempat_pendirian)
                                    }
                                    type="text"
                                    value={data.tempat_pendirian}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <CustomDatePicker
                                    id="tanggal_pendirian"
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.tanggal_pendirian)
                                    }
                                    name="Tanggal Pendirian LKS"
                                    required
                                    value={data.tanggal_pendirian}
                                    handleChange={onHandleChange}
                                />
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Pengurus LKS
                                </div>

                                <Input
                                    id="ketua"
                                    name="Nama Ketua"
                                    isNull={isNull && isNullOrEmpty(data.ketua)}
                                    type="text"
                                    value={data.ketua}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="sekretaris"
                                    name="Nama Sekretaris"
                                    type="text"
                                    isNull={
                                        isNull && isNullOrEmpty(data.sekretaris)
                                    }
                                    value={data.sekretaris}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="bendahara"
                                    name="Nama Bendahara"
                                    isNull={
                                        isNull && isNullOrEmpty(data.bendahara)
                                    }
                                    type="text"
                                    handleChange={onHandleChange}
                                    value={data.bendahara}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex border-t justify-between w-full p-5 order-1">
                            <button
                                onClick={onPrevStep}
                                className="mr-4 text-red-500 font-bold flex items-center "
                            >
                                <ToLeftIcon className="stroke-current w-5 mr-2" />{" "}
                                Kembali
                            </button>
                            <button
                                onClick={() =>
                                    checkDataPerSlide(
                                        "visi, misi, tujuan, posisi_id, lingkup_id, type_rehab_id, lks_status_id, tanggal_pendirian, ketua, sekretaris, bendahara"
                                    )
                                }
                                className="flex items-center h-10 bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2"
                            >
                                Selanjutnya{" "}
                                <ToRightIcon className="stroke-current text-gray-100 w-5 ml-2" />
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        {!isNullOrEmpty(
                            props.comment?.comment_data_legalitas
                        ) && (
                            <div className="bg-gray-200 p-4 rounded-t">
                                <p className="text-red-600">
                                    <b>Catatan: </b>
                                    {props.comment?.comment_data_legalitas}
                                </p>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row justify-between lg:py-0 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Akta Pendirian LKS Berbadan Hukum
                                </div>

                                <Input
                                    id="notaris"
                                    name="Nama Notaris"
                                    type="text"
                                    isNull={
                                        isNull && isNullOrEmpty(data.notaris)
                                    }
                                    value={data.notaris}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <CustomDatePicker
                                    id="tanggal_akta"
                                    name="Tanggal Akta"
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.tanggal_akta)
                                    }
                                    value={data.tanggal_akta}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="nomor_akta"
                                    name="Nomor Akta"
                                    type="text"
                                    isNull={
                                        isNull && isNullOrEmpty(data.nomor_akta)
                                    }
                                    value={data.nomor_akta}
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="nomor_pengesahan"
                                    name="Nomor Pengesahan Kemenkum HAM"
                                    type="text"
                                    handleChange={onHandleChange}
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.nomor_pengesahan)
                                    }
                                    value={data.nomor_pengesahan}
                                    required
                                />
                                <Input
                                    id="keterangan_domisili"
                                    name="Nomor Keterangan Domisili LKS"
                                    placeholder={
                                        "Nomor surat keterangan domisili sekretariat LKS..."
                                    }
                                    type="text"
                                    value={data.keterangan_domisili}
                                    isNull={
                                        isNull &&
                                        isNullOrEmpty(data.keterangan_domisili)
                                    }
                                    handleChange={onHandleChange}
                                    required
                                />
                                <Input
                                    id="npwp"
                                    name="Nomor NPWP"
                                    placeholder={"Nomor NPWP Atas Nama LKS"}
                                    type="text"
                                    isNull={isNull && isNullOrEmpty(data.npwp)}
                                    value={data.npwp}
                                    handleChange={onHandleChange}
                                    required
                                />
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Rekening Bank Atas Nama LKS
                                </div>
                                <SelectOption
                                    id="bank_id"
                                    name="Nama Bank"
                                    options={props.banks}
                                    placeholder={"Pilih Bank..."}
                                    value={data.bank_id}
                                    handleChange={onHandleChange}
                                />
                                <Input
                                    id="nomor_rekening"
                                    name="Nomor Rekening"
                                    inputMode="numeric"
                                    type="text"
                                    value={data.nomor_rekening}
                                    handleChange={onHandleChange}
                                />
                                <Input
                                    id="nama_pemilik_rekening"
                                    name="Nama Pemilik Rekening"
                                    type="text"
                                    value={data.nama_pemilik_rekening}
                                    handleChange={onHandleChange}
                                />
                            </div>
                        </div>
                        <div className="flex border-t justify-between w-full p-5 order-1">
                            <button
                                onClick={onPrevStep}
                                className="mr-4 text-red-500 font-bold flex items-center "
                            >
                                <ToLeftIcon className="stroke-current w-5 mr-2" />{" "}
                                Kembali
                            </button>
                            <button
                                onClick={() =>
                                    checkDataPerSlide(
                                        "notaris, tanggal_akta, nomor_akta, nomor_pengesahan, keterangan_domisili, npwp"
                                    )
                                }
                                className="flex items-center h-10 bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2"
                            >
                                Selanjutnya{" "}
                                <ToRightIcon className="stroke-current text-gray-100 w-5 ml-2" />
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <DokumenCmp
                        comments={props.comment}
                        userStatus={status}
                        tempFile={tempFile}
                        data={data}
                        makeModalShow={makeModalShow}
                        onHandleChangeFile={onHandleChangeFile}
                        onPrevStep={onPrevStep}
                        onSubmit={onSubmit}
                        processing={processing}
                    />
                );
            default:
                return null;
        }
    }, [
        activeStep,
        data,
        optionKecamatan,
        optionKelurahan,
        processing,
        refLogo,
        isNull,
        status,
        isNullOrEmpty,
    ]);

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props.identity.logo}
        >
            <Head title="Profile | Sipelaku Sosial" />
            {showModal && (
                <Modal
                    backdropClick={() => {
                        setShowModal(false);
                        setSrcFileViewer(null);
                    }}
                >
                    <div className="w-4/5 h-full flex items-center bg-white justify-center overflow-hidden rounded animate-bounce-in">
                        {srcFileViewer == null ? (
                            <Spinner
                                width={32}
                                height={32}
                                type="primary-spinner"
                            />
                        ) : (
                            <iframe
                                className="w-full h-full"
                                loading="lazy"
                                src={srcFileViewer}
                            />
                        )}
                    </div>
                </Modal>
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
                        Notifikasi
                    </div>
                    <span className="text-sm text-green-600">
                        Anda telah berhasil melakukan permohonan, Selanjutnya
                        kami akan memverifikasi data tersebut.
                    </span>
                </div>
            )}

            {status == 2 ||
            (status == 5 && !isOneWeekBefore(props.identity.tanggal_expire)) ||
            status == 3 ? (
                <AfterRegister
                    document={props.document}
                    activities={props.activities}
                    auth={props.auth}
                    identity={props.identity}
                    makeModalShow={makeModalShow}
                    address={props.address}
                />
            ) : (
                <div ref={refContainer} className="relative">
                    {Object.keys(errorSubmit).length > 0 && (
                        <div className="fixed top-24 right-6 z-100  bg-red-50 px-5 py-3 rounded shadow animate-bounce-in">
                            <div
                                className="absolute -right-1 -top-1 cursor-pointer bg-white rounded-full shadow"
                                onClick={() => clearErrors()}
                            >
                                <CloseIcon className="stroke-current text-red-600" />
                            </div>
                            <div className="font-medium font-bold text-red-600">
                                Notifikasi
                            </div>
                            <ul className="list-disc list-inside text-sm text-red-600">
                                {Object.keys(errorSubmit).map(function (
                                    key,
                                    index
                                ) {
                                    return (
                                        <li key={index}>{errorSubmit[key]}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    <Stepper
                        styleConfig={{
                            activeBgColor: "#12497C",
                            completedBgColor: "#12497C",
                            inactiveBgColor: "#ccc",
                            fontWeight: "500",
                        }}
                        connectorStateColors={true}
                        connectorStyleConfig={{
                            activeColor: "#12497C",
                            size: 2,
                            disabledColor: "#e5e7e9",
                            completedColor: "#12497C",
                        }}
                        activeStep={activeStep}
                    >
                        <Step
                            completed={activeStep >= 0}
                            onClick={
                                processing ? undefined : () => setActiveStep(0)
                            }
                            label="Data umum"
                        />
                        <Step
                            completed={activeStep > 0}
                            onClick={
                                processing ? undefined : () => setActiveStep(1)
                            }
                            label="Identitas"
                        />
                        <Step
                            completed={activeStep > 1}
                            onClick={
                                processing ? undefined : () => setActiveStep(2)
                            }
                            label="Legalitas"
                        />
                        <Step
                            completed={activeStep > 2}
                            onClick={
                                processing ? undefined : () => setActiveStep(3)
                            }
                            label="Dokumen"
                        />
                    </Stepper>
                    {status == 4 &&
                        !isNullOrEmpty(props?.comment?.comment_catatan) && (
                            <div
                                onClick={toogleRevisi}
                                className="w-full cursor-pointer select-none bg-gray-200 rounded-t px-4 py-2 shadow-sm"
                            >
                                <div
                                    className={`flex items-center justify-between font-semibold py-2 ${
                                        detailRevisi &&
                                        "border-b border-gray-300"
                                    }`}
                                >
                                    <div>Catatan Kadis</div>
                                    <div
                                        className={`ml-8 transition transition-transform ${
                                            detailRevisi &&
                                            "transform rotate-180"
                                        }`}
                                    >
                                        <ArrowDownIcon
                                            width="20px"
                                            height="20px"
                                        />
                                    </div>
                                </div>
                                {detailRevisi && (
                                    <div className="py-2">
                                        {props?.comment?.comment_catatan}
                                    </div>
                                )}
                            </div>
                        )}
                    {renderForm()}
                </div>
            )}
        </Dashboard>
    );
};

export default Profile;
