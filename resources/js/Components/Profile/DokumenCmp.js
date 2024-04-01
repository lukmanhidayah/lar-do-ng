import ToLeftIcon from "@/Icon/ToLeftIcon";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import React from "react";
import ButtonUnggah from "../ButtonUnggah";
import Spinner from "../Spinner";
import StatusUnggah from "../StatusUnggah";

const DokumenCmp = ({
    onSubmit,
    processing,
    comments,
    userStatus,
    makeModalShow,
    tempFile,
    onPrevStep,
    onHandleChangeFile,
    data,
}) => {
    return (
        <div className="w-full min-h-3/4 bg-white rounded shadow flex flex-col">
            <div className="py-4 w-full flex-1 overflow-y-auto">
                <table className="w-full">
                    <thead>
                        <tr className="custom-table-header">
                            <th>No</th>
                            <th>Jenis Dokumen</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="custom-table-body">
                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">1</div>
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="text-sm">
                                    <div>
                                        <b>
                                            Akta Pendirian s/d Akte Perubahan
                                            Terakhir (dari notaris)
                                        </b>
                                    </div>
                                    <ul className="list-inside bg-rose-200 ">
                                        <li>
                                            Jenis kesos tercantum dalam maksud
                                            dan tujuan.
                                        </li>
                                        <li>
                                            Nama pengurus dan LKS tercantum
                                            dalam akte pendirian/perubahan.
                                        </li>
                                    </ul>
                                    (Tipe: PDF dan ukuran maksimal: 20MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_akta_pendirian
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_file_akta_pendirian
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_akta_pendirian}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_akta_pendirian}
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_akta_pendirian
                                            )
                                        }
                                        id="file_akta_pendirian"
                                        accept={"application/pdf"}
                                        onHandleChange={onHandleChangeFile}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">2</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>
                                        Izin pendirian/pengesahan Kemenkumham RI
                                    </b>{" "}
                                    <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_izin_pendirian
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_file_izin_pendirian
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_izin_pendirian}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <ButtonUnggah
                                    id="file_izin_pendirian"
                                    data={data.file_izin_pendirian}
                                    onViewHandle={() =>
                                        makeModalShow(
                                            tempFile.file_izin_pendirian
                                        )
                                    }
                                    onHandleChange={onHandleChangeFile}
                                    accept={"application/pdf"}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">3</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>
                                        Anggaran Dasar dan Anggaran Rumah Tangga
                                    </b>{" "}
                                    <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_adart
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {comments?.comment_file_adart}
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_adart}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        id="file_adart"
                                        data={data.file_adart}
                                        onViewHandle={() =>
                                            makeModalShow(tempFile.file_adart)
                                        }
                                        onHandleChange={onHandleChangeFile}
                                        accept={"application/pdf"}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">4</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>
                                        Susunan kepengurusan beserta fotocopy
                                        KTP
                                    </b>
                                    <br />
                                    Minimal Ketua; Sekertaris; Bendahara <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_susunan_pengurus
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_file_susunan_pengurus
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_susunan_pengurus}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_susunan_pengurus}
                                        id="file_susunan_pengurus"
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_susunan_pengurus
                                            )
                                        }
                                        onHandleChange={onHandleChangeFile}
                                        accept={"application/pdf"}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">5</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>
                                        Surat Keterangan Domisili sekretariat
                                        LKS dari Kecamatan
                                    </b>
                                    <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_surat_domisili
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_file_surat_domisili
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_surat_domisili}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_surat_domisili}
                                        id="file_surat_domisili"
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_surat_domisili
                                            )
                                        }
                                        onHandleChange={onHandleChangeFile}
                                        accept={"application/pdf"}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">6</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>Salinan NPWP</b> <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_npwp
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {comments?.comment_file_npwp}
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_npwp}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_npwp}
                                        accept={"application/pdf"}
                                        id="file_npwp"
                                        onViewHandle={() =>
                                            makeModalShow(tempFile.file_npwp)
                                        }
                                        onHandleChange={onHandleChangeFile}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">7</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>
                                        Laporan kegiatan (profil LKS/Orsos)
                                        berserta foto kegiatan
                                    </b>
                                    <br/>(Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_laporan_kegiatan
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_file_laporan_kegiatan
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_laporan_kegiatan}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_laporan_kegiatan}
                                        accept={"application/pdf"}
                                        id="file_laporan_kegiatan"
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_laporan_kegiatan
                                            )
                                        }
                                        onHandleChange={onHandleChangeFile}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">8</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>Data klien By Name By Address</b> <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_data_klien
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {comments?.comment_file_data_klien}
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_data_klien}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_data_klien}
                                        accept={"application/pdf"}
                                        id="file_data_klien"
                                        onHandleChange={onHandleChangeFile}
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_data_klien
                                            )
                                        }
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">9</div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>Foto plang LKS</b> <br />
                                    (Tipe: JPG/PNG/JPEG dan ukuran maksimal:
                                    5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_foto_plang_yayasan
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {
                                                comments?.comment_foto_plang_yayasan
                                            }
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.foto_plang_yayasan}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.foto_plang_yayasan}
                                        accept={
                                            "image/png,image/jpg,image/jpeg"
                                        }
                                        id="foto_plang_yayasan"
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.foto_plang_yayasan
                                            )
                                        }
                                        onHandleChange={onHandleChangeFile}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">
                                    10
                                </div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>Visi Misi LKS</b> <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_visi_misi
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {comments?.comment_file_visi_misi}
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_visi_misi}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_visi_misi}
                                        accept={"application/pdf"}
                                        id="file_visi_misi"
                                        onViewHandle={() =>
                                            makeModalShow(
                                                tempFile.file_visi_misi
                                            )
                                        }
                                        onHandleChange={onHandleChangeFile}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="px-4 py-5 text-ms">
                                <div className="flex items-start h-full">
                                    11
                                </div>
                            </td>
                            <td className="px-4 py-5">
                                <div className="text-sm">
                                    <b>Program kerja tahunan LKS</b> <br />
                                    (Tipe: PDF dan ukuran maksimal: 5MB)
                                </div>
                                {!isNullOrEmpty(
                                    comments?.comment_file_proker
                                ) && (
                                    <div className="border-t bg-opacity-50 mt-3 p-2 rounded">
                                        <p className="text-red-600">
                                            <b>Catatan: </b>
                                            {comments?.comment_file_proker}
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td className="px-4 py-5 text-xs text-center">
                                <StatusUnggah
                                    data={data.file_proker}
                                    userStatus={userStatus}
                                />
                            </td>
                            <td className="px-4 py-5 ">
                                <div className="flex gap-4 items-center justify-center">
                                    <ButtonUnggah
                                        data={data.file_proker}
                                        accept={"application/pdf"}
                                        id="file_proker"
                                        onViewHandle={() =>
                                            makeModalShow(tempFile.file_proker)
                                        }
                                        onHandleChange={onHandleChangeFile}
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
                    <ToLeftIcon className="stroke-current w-5 mr-2" /> Kembali
                </button>
                <button
                    onClick={onSubmit}
                    disabled={processing}
                    className={`flex items-center w-24 h-10 justify-center bg-primary-600 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2 ${
                        processing && "opacity-75"
                    }`}
                >
                    {processing ? <Spinner width={18} height={18} /> : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default DokumenCmp;
