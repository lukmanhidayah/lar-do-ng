import React, { useState, useCallback, useRef, useEffect } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { Stepper, Step } from "react-form-stepper";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import Input from "@/Components/Input";
import ToRightIcon from "@/Icon/ToRightIcon";
import CustomTextArea from "@/Components/CustomTextArea";
import "@/Assets/Css/my-table.css";
import config from "@/config";
import Spinner from "@/Components/Spinner";
import { Modal } from "@/Components/Dashboard/Modal";
import Checkbox from "@/Components/Checkbox";
import ToLeftIcon from "@/Icon/ToLeftIcon";
import { mockDataCheckboxValidasiPermohonan as mockData } from "@/Utils/mockData";
import checkObject from "@/Utils/checkObject";
import CloseIcon from "@/Icon/CloseIcon";

import {
    initData,
    initDataValidate,
    initDataVeriMessage,
    initDataValidateComment,
} from "@/Utils/initData";
import atLeastOne from "@/Utils/atLeastOne";
import SelectOption from "@/Components/SelectOption";
import MessageModal from "@/Components/modals/MessageModal";

const PermohonanWithId = (props) => {
    const {
        data: validate,
        setData: setValidate,
        post,
        processing,
        errors,
        transform,
        wasSuccessful,
        reset,
        clearErrors,
    } = useForm({
        ...initDataValidate,
    });

    const [activeStep, setActiveStep] = useState(3);
    const [isNull, setIsNull] = useState(false);
    const [canChangeLksType, setCanChangeLksType] = useState(false);

    const [data, setData] = useState({
        ...initData,
        type_id: "",
    });

    const [showModal, setShowModal] = useState(false);
    const [srcFileViewer, setSrcFileViewer] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState({
        ...initDataVeriMessage,
    });
    const refLogo = useRef(null);
    const refTable = useRef(null);

    const [dataValidateComments, setDataValidateComments] = useState({
        ...initDataValidateComment,
    });

    const makeModalShow = (data) => {
        setShowModal(true);
        setTimeout(() => {
            setSrcFileViewer(data);
        }, 1000);
    };

    const onResetVerificationMessage = () => {
        setVerificationMessage({
            ...initDataVeriMessage,
        });
    };

    const [isShowButton, setIsShowButton] = useState(false);

    useEffect(() => {
        setData((prevState) => ({ ...prevState, ...props.data }));
        mockFunction();
    }, []);

    useEffect(() => {
        isCanVerification();
    }, [validate]);

    const mockFunction = () => {
        let mock = false;
        if (mock) {
            setValidate((prevState) => ({
                ...prevState,
                ...mockData,
            }));
        }
    };

    const onNextStep = () => {
        setActiveStep((prevState) => prevState + 1);
    };

    const onPrevStep = () => {
        setActiveStep((prevState) => prevState - 1);
    };

    const onVerification = async () => {
        setIsShowButton(false);
        setIsNull(false);
        onResetVerificationMessage();
        const isComplete = checkObject(
            validate,
            "data_umum, data_identitas, data_legalitas, file_akta_pendirian, file_izin_pendirian, file_adart, file_susunan_pengurus, file_surat_domisili, file_npwp, file_laporan_kegiatan, file_data_klien, foto_plang_yayasan, file_visi_misi, file_proker",
            true
        );
        if (isComplete.status == false) {
            setVerificationMessage({
                show: true,
                error: true,
                message: (
                    <span>
                        Data{" "}
                        <strong>{isComplete.data.replace("data_", "")}</strong>{" "}
                        belum dicentang, harap centang semua data untuk
                        melakukan verifikasi.
                    </span>
                ),
            });
        } else {
            if (isNullOrEmpty(data.type_id)) {
                setIsNull(true);
                setVerificationMessage({
                    show: true,
                    error: true,
                    message: (
                        <span>
                            Data <strong>Tipe LKS</strong> belum diisi, harap
                            isi data tersebut untuk melanjutkan verifikasi.
                        </span>
                    ),
                });
                return;
            }
            // setTimeout(() => {
            Inertia.post(
                "/permohonan/admin",
                {
                    user_id: props.id,
                    status_id: 3,
                    type_id: data.type_id.value,
                    // email: "john.doe@example.com",
                },
                {
                    onSuccess: (_) => {
                        setVerificationMessage({
                            show: true,
                            error: false,
                            message: `Verifikasi terhadap yayasan ${data.name} berhasil.`,
                        });
                    },
                    onError: (errors) => {
                        setVerificationMessage({
                            show: true,
                            error: true,
                            message: (
                                <span>
                                    {Object.keys(errors).map(function (
                                        key,
                                        index
                                    ) {
                                        return (
                                            <li key={index}>{errors[key]}</li>
                                        );
                                    })}
                                </span>
                            ),
                        });
                    },
                }
            );
        }
    };

    const onRevisi = async () => {
        setIsShowButton(false);
        // const user_role_id = props.auth.user.user_role_id;
        onResetVerificationMessage();
        const isComplete = atLeastOne(
            dataValidateComments,
            "comment_data_umum, comment_data_identitas, comment_data_legalitas, comment_file_akta_pendirian, comment_file_izin_pendirian, comment_file_adart, comment_file_susunan_pengurus, comment_file_surat_domisili, comment_file_npwp, comment_file_laporan_kegiatan, comment_file_data_klien, comment_foto_plang_yayasan, comment_file_visi_misi, comment_file_proker"
        );
        if (isComplete.status == false) {
            setVerificationMessage({
                show: true,
                error: true,
                message: (
                    <span>
                        Setidaknya beri satu komentar untuk memudahkan pihak LKS
                        merevisi permohonannya.
                    </span>
                ),
            });
        } else {
            // setTimeout(() => {
            Inertia.post(
                "revisi",
                {
                    user_id: props.id,
                    status_id: 4,
                    data_umum: validate.data_umum,
                    data_identitas: validate.data_identitas,
                    data_legalitas: validate.data_legalitas,
                    file_akta_pendirian: validate.file_akta_pendirian,
                    file_izin_pendirian: validate.file_izin_pendirian,
                    file_adart: validate.file_adart,
                    file_susunan_pengurus: validate.file_susunan_pengurus,
                    file_surat_domisili: validate.file_surat_domisili,
                    file_npwp: validate.file_npwp,
                    file_laporan_kegiatan: validate.file_laporan_kegiatan,
                    file_data_klien: validate.file_data_klien,
                    foto_plang_yayasan: validate.foto_plang_yayasan,
                    file_visi_misi: validate.file_visi_misi,
                    file_proker: validate.file_proker,
                    comment_data_umum: dataValidateComments.comment_data_umum,
                    comment_data_identitas:
                        dataValidateComments.comment_data_identitas,
                    comment_data_legalitas:
                        dataValidateComments.comment_data_legalitas,
                    comment_file_akta_pendirian:
                        dataValidateComments.comment_file_akta_pendirian,
                    comment_file_izin_pendirian:
                        dataValidateComments.comment_file_izin_pendirian,
                    comment_file_adart: dataValidateComments.comment_file_adart,
                    comment_file_susunan_pengurus:
                        dataValidateComments.comment_file_susunan_pengurus,
                    comment_file_surat_domisili:
                        dataValidateComments.comment_file_surat_domisili,
                    comment_file_npwp: dataValidateComments.comment_file_npwp,
                    comment_file_laporan_kegiatan:
                        dataValidateComments.comment_file_laporan_kegiatan,
                    comment_file_data_klien:
                        dataValidateComments.comment_file_data_klien,
                    comment_foto_plang_yayasan:
                        dataValidateComments.comment_foto_plang_yayasan,
                    comment_file_visi_misi:
                        dataValidateComments.comment_file_visi_misi,
                    comment_file_proker:
                        dataValidateComments.comment_file_proker,
                },
                {
                    onSuccess: (_) => {
                        setVerificationMessage({
                            show: true,
                            error: false,
                            message: `Revisi terhadap yayasan ${data.name} berhasil.`,
                        });
                    },
                    onError: (errors) => {
                        setVerificationMessage({
                            show: true,
                            error: true,
                            message: (
                                <span>
                                    {Object.keys(errors).map(function (
                                        key,
                                        index
                                    ) {
                                        return (
                                            <li key={index}>{errors[key]}</li>
                                        );
                                    })}
                                </span>
                            ),
                        });
                    },
                }
            );
        }
    };

    const handleChangeValidations = (e) => {
        setValidate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }));
        const commentTarget = {
            target: {
                name: "comment_" + e.target.name,
                value: "",
            },
        };
        handleChangeComments(commentTarget);
    };

    const onHandleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeComments = (e) => {
        setDataValidateComments((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const isCanVerification = () => {
        setCanChangeLksType(
            checkObject(
                validate,
                "data_umum, data_identitas, data_legalitas, file_akta_pendirian, file_izin_pendirian, file_adart, file_susunan_pengurus, file_surat_domisili, file_npwp, file_laporan_kegiatan, file_data_klien, foto_plang_yayasan, file_visi_misi, file_proker",
                true
            ).status
        );
    };

    const renderForm = useCallback(() => {
        switch (activeStep) {
            case 0:
                return (
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        <div className="flex flex-col lg:flex-row justify-between lg:py-2 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <Input
                                    id="noReg"
                                    name="Nomor Registrasi LKS"
                                    type="text"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.no_reg}
                                />
                                <Input
                                    id="name"
                                    name="Nama Lengkap LKS"
                                    disable
                                    disabledColor="bg-white"
                                    type="text"
                                    value={data.name}
                                />
                                <Input
                                    id="singkatan_yayasan"
                                    name="Singkatan Nama LKS"
                                    type="text"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.singkatan_yayasan}
                                />
                                <Input
                                    id="alamat"
                                    name="Alamat Sekretariat"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.alamat}
                                    type="text"
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <Input
                                        id="kecamatan_id"
                                        name="Kecamatan"
                                        disable
                                        disabledColor="bg-white"
                                        value={data.kecamatan_name}
                                        type="text"
                                    />
                                    <Input
                                        id="kelurahan_id"
                                        disable
                                        disabledColor="bg-white"
                                        name="Kelurahan"
                                        value={data.kelurahan_name}
                                        type="text"
                                    />
                                    <Input
                                        id="rt"
                                        name="RT"
                                        disable
                                        disabledColor="bg-white"
                                        type="text"
                                        value={data.rt}
                                    />
                                    <Input
                                        id="rw"
                                        name="RW"
                                        disable
                                        disabledColor="bg-white"
                                        type="text"
                                        value={data.rw}
                                    />
                                </div>
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <Input
                                    id="telepon"
                                    name="Telepon / HP"
                                    type="text"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.nomor_handphone}
                                />
                                <Input
                                    id="fax"
                                    name="Fax"
                                    disable
                                    disabledColor="bg-white"
                                    type="text"
                                    value={data.fax || " "}
                                />
                                <Input
                                    id="email"
                                    name="Email"
                                    type="text"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.email}
                                />
                                <Input
                                    id="website"
                                    name="Website"
                                    disable
                                    disabledColor="bg-white"
                                    value={data.website || " "}
                                    type="text"
                                />
                                <div className="block text-gray-900 text-base font-semibold mb-2">
                                    Logo LKS
                                </div>
                                <div
                                    className={`relative flex flex-col items-center justify-center p-3 pb-1 mb-6 border border-dashed border-gray-300 h-48 rounded overflow-hidden`}
                                >
                                    {data.logo && (
                                        <img
                                            loading="lazy"
                                            src={config.drive_url + data.logo}
                                            className="max-w-full max-h-full"
                                            alt="logo"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex border-t justify-end w-full p-5">
                            <button
                                onClick={onNextStep}
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
                        <div className="flex flex-col lg:flex-row justify-between lg:py-0 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <CustomTextArea
                                    id="visi"
                                    name="Visi LKS"
                                    type="text"
                                    value={data.visi}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <CustomTextArea
                                    id="misi"
                                    name="Misi LKS"
                                    type="text"
                                    value={data.misi}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <CustomTextArea
                                    id="tujuan"
                                    name="Tujuan LKS"
                                    type="text"
                                    value={data.tujuan}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <Input
                                        id={"posisi_id"}
                                        name="Posisi LKS"
                                        type="text"
                                        value={data.posisi_name}
                                        disable
                                        disabledColor="bg-white"
                                    />
                                    <Input
                                        id="lingkup_id"
                                        name="Lingkup Kerja"
                                        type="text"
                                        value={data.lingkup_name}
                                        disable
                                        disabledColor="bg-white"
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-x-0 lg:gap-x-4 w-full">
                                    <Input
                                        id={"lks_status_id"}
                                        name="Status LKS"
                                        type="text"
                                        value={data?.lks_status_name}
                                        disable
                                        disabledColor="bg-white"
                                    />
                                    <Input
                                        id="type_rehab_id"
                                        name="Jenis Penyelenggaraan Kesos"
                                        type="text"
                                        value={data?.type_rehab_name.toLowerCase()}
                                        disable
                                        disabledColor="bg-white"
                                    />
                                </div>
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <Input
                                    id="tempat_pendirian"
                                    name="Tempat Pendirian LKS"
                                    placeholder="Nama Kota..."
                                    type="text"
                                    value={data.tempat_pendirian}
                                    disable
                                    disabledColor="bg-white"
                                />

                                <Input
                                    id="tanggal_pendirian"
                                    name="Tanggal Pendirian LKS"
                                    type="text"
                                    value={data.tanggal_pendirian}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Pengurus LKS
                                </div>

                                <Input
                                    id="ketua"
                                    name="Nama Ketua"
                                    type="text"
                                    value={data.ketua}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="sekretaris"
                                    name="Nama Sekretaris"
                                    type="text"
                                    value={data.sekretaris}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="bendahara"
                                    name="Nama Bendahara"
                                    type="text"
                                    value={data.bendahara}
                                    disable
                                    disabledColor="bg-white"
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
                                onClick={onNextStep}
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
                        <div className="flex flex-col lg:flex-row justify-between lg:py-0 py-4 w-full flex-1">
                            <div className="w-full py-0 lg:py-4 px-6">
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Akta Pendirian LKS Berbadan Hukum
                                </div>

                                <Input
                                    id="notaris"
                                    name="Nama Notaris"
                                    type="text"
                                    value={data.notaris}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="tanggal_akta"
                                    name="Tanggal Akta"
                                    type="text"
                                    value={data.tanggal_akta}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="nomor_akta"
                                    name="Nomor Akta"
                                    type="text"
                                    value={data.nomor_akta}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="nomor_pengesahan"
                                    name="Nomor Pengesahan Kemenkum HAM"
                                    type="text"
                                    value={data.nomor_pengesahan}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="keterangan_domisili"
                                    name="Keterangan Domisili"
                                    type="text"
                                    value={data.keterangan_domisili}
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="npwp"
                                    name="Nomor NPWP"
                                    type="text"
                                    value={data.npwp}
                                    disable
                                    disabledColor="bg-white"
                                />
                            </div>
                            <div className="w-full py-0 lg:py-4 px-6 relative">
                                <div className="block text-primary-600 text-base font-bold mb-2">
                                    Rekening Bank Atas Nama LKS
                                </div>
                                <Input
                                    id="bank_id"
                                    name="Nama Bank"
                                    type="text"
                                    value={
                                        isNullOrEmpty(data.bank_name)
                                            ? ""
                                            : data.bank_name
                                    }
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="nomor_rekening"
                                    name="Nomor Rekening"
                                    type="text"
                                    value={
                                        isNullOrEmpty(data.nomor_rekening)
                                            ? ""
                                            : data.nomor_rekening
                                    }
                                    disable
                                    disabledColor="bg-white"
                                />
                                <Input
                                    id="nama_pemilik_rekening"
                                    name="Nama Pemilik Rekening"
                                    type="text"
                                    value={
                                        isNullOrEmpty(
                                            data.nama_pemilik_rekening
                                        )
                                            ? ""
                                            : data.nama_pemilik_rekening
                                    }
                                    disable
                                    disabledColor="bg-white"
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
                                onClick={onNextStep}
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
                    <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
                        <div className="py-4 w-full flex-1 overflow-y-auto">
                            <table ref={refTable} className="w-full">
                                <thead>
                                    <tr className="custom-table-header">
                                        <th>No</th>
                                        <th>Jenis Dokumen</th>
                                        <th className="text-center">Aksi</th>
                                        <th className="text-center">
                                            Validasi
                                        </th>
                                        <th className="text-center">
                                            Komentar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="custom-table-body">
                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                1
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="text-sm">
                                                <div>
                                                    Data Umum Lembaga
                                                    Kesejahteraan Sosial(LKS)
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        setActiveStep(0)
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="data_umum"
                                                    value={validate.data_umum}
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={validate.data_umum}
                                                    className="h-20"
                                                    id="comment_data_umum"
                                                    name="Komentar data umum"
                                                    value={
                                                        dataValidateComments.comment_data_umum
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                2
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="text-sm">
                                                <div>
                                                    Identitas Lembaga
                                                    Kesejahteraan Sosial(LKS)
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        setActiveStep(1)
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="data_identitas"
                                                    value={
                                                        validate.data_identitas
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    className="h-20"
                                                    disable={
                                                        validate.data_identitas
                                                    }
                                                    id="comment_data_identitas"
                                                    name="Komentar data identitas"
                                                    value={
                                                        dataValidateComments.comment_data_identitas
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                3
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="text-sm">
                                                Legalitas Lembaga Kesejahteraan
                                                Sosial (LKS)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        setActiveStep(2)
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="data_legalitas"
                                                    value={
                                                        validate.data_legalitas
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.data_legalitas
                                                    }
                                                    className="h-20"
                                                    id="comment_data_legalitas"
                                                    name="Komentar data legalitas"
                                                    value={
                                                        dataValidateComments.comment_data_legalitas
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                4
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="text-sm">
                                                <div>
                                                    Akta Pendirian s/d Akte
                                                    Perubahan Terakhir (dari
                                                    notaris)
                                                </div>
                                                <ul className="list-inside bg-rose-200 ">
                                                    <li>
                                                        Jenis kesos tercantum
                                                        dalam maksud dan tujuan.
                                                    </li>
                                                    <li>
                                                        Nama pengurus dan
                                                        Yayasan tercantum dalam
                                                        akte
                                                        pendirian/perubahan.
                                                    </li>
                                                </ul>
                                                (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_akta_pendirian
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_akta_pendirian"
                                                    value={
                                                        validate.file_akta_pendirian
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_akta_pendirian
                                                    }
                                                    className="h-20"
                                                    id="comment_file_akta_pendirian"
                                                    name="Komentar file akta pendirian"
                                                    value={
                                                        dataValidateComments.comment_file_akta_pendirian
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                5
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Izin pendirian/pengesahan
                                                Kemenkumham RI (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_izin_pendirian
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_izin_pendirian"
                                                    value={
                                                        validate.file_izin_pendirian
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_izin_pendirian
                                                    }
                                                    className="h-20"
                                                    id="comment_file_izin_pendirian"
                                                    name="Komentar file izin pendirian"
                                                    value={
                                                        dataValidateComments.comment_file_izin_pendirian
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                6
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Anggaran Dasar dan Anggaran
                                                Rumah Tangga (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_adart
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_adart"
                                                    value={validate.file_adart}
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_adart
                                                    }
                                                    className="h-20"
                                                    id="comment_file_adart"
                                                    name="Komentar file ADART"
                                                    value={
                                                        dataValidateComments.comment_file_adart
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                7
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Susunan kepengurusan beserta
                                                fotocopy KTP <br />
                                                Minimal Ketua; Sekertaris;
                                                Bendahara (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_susunan_pengurus
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_susunan_pengurus"
                                                    value={
                                                        validate.file_susunan_pengurus
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_susunan_pengurus
                                                    }
                                                    className="h-20"
                                                    id="comment_file_susunan_pengurus"
                                                    name="Komentar susunan pengurus"
                                                    value={
                                                        dataValidateComments.comment_file_susunan_pengurus
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                8
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Surat Keterangan Domisili
                                                (terbaru) Dari Lurah sampai
                                                Camat (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_surat_domisili
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_surat_domisili"
                                                    value={
                                                        validate.file_surat_domisili
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_surat_domisili
                                                    }
                                                    className="h-20"
                                                    id="comment_file_surat_domisili"
                                                    name="Komentar file surat domisili"
                                                    value={
                                                        dataValidateComments.comment_file_surat_domisili
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                9
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Salinan NPWP (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_npwp
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_npwp"
                                                    value={validate.file_npwp}
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={validate.file_npwp}
                                                    className="h-20"
                                                    id="comment_file_npwp"
                                                    name="Komentar file npwp"
                                                    value={
                                                        dataValidateComments.comment_file_npwp
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                10
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Laporan kegiatan (profil
                                                LKS/Orsos) berserta foto
                                                kegiatan (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_laporan_kegiatan
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_laporan_kegiatan"
                                                    value={
                                                        validate.file_laporan_kegiatan
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    disable={
                                                        validate.file_laporan_kegiatan
                                                    }
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    className="h-20"
                                                    id="comment_file_laporan_kegiatan"
                                                    name="Komentar file laporan kegiatan"
                                                    value={
                                                        dataValidateComments.comment_file_laporan_kegiatan
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                11
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Data klien By Name By Address
                                                (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_data_klien
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_data_klien"
                                                    value={
                                                        validate.file_data_klien
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_data_klien
                                                    }
                                                    className="h-20"
                                                    id="comment_file_data_klien"
                                                    name="Komentar file data klien"
                                                    value={
                                                        dataValidateComments.comment_file_data_klien
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                12
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Foto plang Yayasan
                                                (jpg/png/jpeg)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.foto_plang_yayasan
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="foto_plang_yayasan"
                                                    value={
                                                        validate.foto_plang_yayasan
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    disable={
                                                        validate.foto_plang_yayasan
                                                    }
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    className="h-20"
                                                    id="comment_foto_plang_yayasan"
                                                    name="Komentar foto plang yayasan"
                                                    value={
                                                        dataValidateComments.comment_foto_plang_yayasan
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                13
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Visi Misi Yayasan (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_visi_misi
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_visi_misi"
                                                    value={
                                                        validate.file_visi_misi
                                                    }
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    disable={
                                                        validate.file_visi_misi
                                                    }
                                                    className="h-20"
                                                    id="comment_file_visi_misi"
                                                    name="Komentar file visi misi"
                                                    value={
                                                        dataValidateComments.comment_file_visi_misi
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                14
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Program kerja tahunan Yayasan
                                                (pdf)
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 ">
                                            <div className="flex gap-4 items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        makeModalShow(
                                                            config.drive_url +
                                                                data.file_proker
                                                        )
                                                    }
                                                    className={`bg-primary-600 active:bg-primary-800 py-1 px-3 rounded shadow text-white font-bold`}
                                                >
                                                    Lihat
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-4 items-center justify-center">
                                                <Checkbox
                                                    name="file_proker"
                                                    value={validate.file_proker}
                                                    handleChange={
                                                        handleChangeValidations
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="p-2 h-full">
                                                <CustomTextArea
                                                    hideLabel
                                                    disable={
                                                        validate.file_proker
                                                    }
                                                    handleChange={
                                                        handleChangeComments
                                                    }
                                                    className="h-20"
                                                    id="comment_file_proker"
                                                    name="Komentar file proker"
                                                    value={
                                                        dataValidateComments.comment_file_proker
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-5 text-ms font-semibold">
                                            <div className="flex items-start h-full">
                                                14
                                            </div>
                                        </td>
                                        <td className="px-4 py-5">
                                            <div className="text-sm">
                                                Tipe Lks
                                                <br />
                                                <div className="px-4">
                                                    <ul>
                                                        <li>
                                                            Dipilih jika
                                                            memutuskan untuk
                                                            melakukan{" "}
                                                            <b>verifikasi</b>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                        <td />
                                        <td className="px-4 py-5 " colSpan={2}>
                                            <div className="flex gap-4 items-center justify-center">
                                                <SelectOption
                                                    id="type_id"
                                                    isNull={
                                                        isNull &&
                                                        isNullOrEmpty(
                                                            data.type_id
                                                        )
                                                    }
                                                    isDisabled={
                                                        !canChangeLksType
                                                    }
                                                    className="w-full"
                                                    options={props.userTypes}
                                                    value={data.type_id}
                                                    handleChange={
                                                        onHandleChange
                                                    }
                                                    placeholder={"Tipe Lks..."}
                                                    required
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex border-t justify-between w-full p-5 order-1">
                            <button
                                onClick={onPrevStep}
                                className="mr-4 text-red-500 font-bold flex items-center "
                            >
                                <ToLeftIcon className="stroke-current w-5 mr-2" />{" "}
                                Kembali
                            </button>
                            <div className="flex relative">
                                {isShowButton && (
                                    <div
                                        className={`absolute bg-white flex py-5 px-5 justify-center items-center rounded shadow button-verification-container animate-bounce-in`}
                                    >
                                        <div
                                            className="absolute -right-2 -top-2 cursor-pointer bg-white rounded-full shadow"
                                            onClick={() =>
                                                setIsShowButton(false)
                                            }
                                        >
                                            <CloseIcon
                                                className={`stroke-current text-red-600`}
                                            />
                                        </div>
                                        <button
                                            onClick={onRevisi}
                                            disabled={processing}
                                            className={`flex items-center w-24 h-10 justify-center bg-white active:bg-red-100 border border-red-500  py-2 px-4 rounded text-red-600 font-bold mr-4 ${
                                                processing && "opacity-75"
                                            }`}
                                        >
                                            Revisi
                                        </button>
                                        <button
                                            disabled={processing}
                                            className={`flex items-center w-24 h-10 justify-center bg-white active:bg-blue-10 border border-primary-800 py-2 px-4 rounded text-primary-800 font-bold ml-2 ${
                                                processing && "opacity-75"
                                            }`}
                                            onClick={onVerification}
                                        >
                                            Verifikasi
                                        </button>
                                    </div>
                                )}
                                <button
                                    disabled={processing}
                                    className={`flex items-center w-24 h-10 justify-center bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2 ${
                                        (processing || isShowButton) &&
                                        "opacity-75"
                                    }`}
                                    onClick={() => setIsShowButton(true)}
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
                );
            default:
                return null;
        }
    }, [
        activeStep,
        data,
        processing,
        refLogo,
        canChangeLksType,
        isNull,
        isNullOrEmpty,
        validate,
        isShowButton,
        onVerification,
        dataValidateComments,
    ]);

    return (
        <Dashboard auth={props.auth} totalNotify={props.totalNotify}>
            <Head title="Permohonan | Sipelaku Sosial" />

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
                                title={srcFileViewer}
                                aria-hidden="true"
                                src={srcFileViewer}
                            ></iframe>
                        )}
                    </div>
                </Modal>
            )}

            <div className="relative">
                <MessageModal
                    message={verificationMessage}
                    onResetMessage={onResetVerificationMessage}
                />
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
                    {stepData.map((res, index) => {
                        return (
                            <Step
                                key={index}
                                completed
                                label={res.label}
                                onClick={() => setActiveStep(index)}
                            />
                        );
                    })}
                </Stepper>
                {renderForm()}
            </div>
        </Dashboard>
    );
};

const stepData = [
    { label: "Data umum" },
    { label: "Identitas" },
    { label: "Legalitas" },
    { label: "Dokunen" },
];

export default PermohonanWithId;
