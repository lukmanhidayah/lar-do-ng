import React from "react";
import indonesia from "date-fns/locale/id";
import format from "date-fns/format";
import "@/Assets/Css/tanda_daftar_yayasan.css";

const TandaDaftarYayasan = (props) => {
    const generateLingkupLast = (id) => {
        if (id == 2) {
            return "Jawa Barat";
        } else if (id == 3) {
            return "Bandung";
        }
        return "";
    };

    return (
        <div className="tdy-body bg-blue-10 w-full min-h-screen flex justify-center py-4">
            <div className="tdy-container">
                <div className="tdy-content">
                    <div className="tdy-header">
                        <h1 className="text-lg uppercase font-roboto-slab">
                            Pemerintah Kota Bandung
                        </h1>
                        <h2 className="text-2xl uppercase font-bold font-roboto-slab">
                            Dinas Sosial
                        </h2>
                        <address className="text-base not-italic text-center font-roboto-slab px-8">
                            Alamat. Jl. Babakan Karet (Belakang Rusunawa
                            Rancacili) Kel. Derwati Kec. Rancasari Kota Bandung.
                        </address>
                    </div>
                    <div className="tdy-middle">
                        <div className="title-middle font-roboto-slab">
                            <h3 className="font-roboto-slab text-center font-bold">
                                Penetapan Terdaftar
                                <br />
                                Sebaga Lembaga Kesejahteraan Sosial (LKS)
                            </h3>
                            <p className="font-roboto-slab text-center">
                                Nomor:{" "}
                                <b className="font-roboto-slab">
                                    LKS/18122021/dinsos-BDG/0001
                                </b>
                            </p>
                        </div>
                        <div className="middle-desc">
                            <p className="font-roboto-slab text-sm text-justify">
                                Berdasarkan Undang-Undang RI No.11 Tahun 2009
                                tentang Kesejanteraan Sosial dan Peraturan
                                Daerah Kota Bandung Nomor: 24 Tahun 2012 Tentang
                                Penyelenggaraan dan Penanganan Kesejahteraan
                                Sosial, Kepala Dinas Sosial Kota Bandung
                                Menyatakan Bahwa:
                            </p>
                        </div>
                        <div className="middle-content">
                            <table className="w-full profile-table">
                                <tbody>
                                    <tr>
                                        <td width={300}>1. Nama Lembaga</td>
                                        <td width={15}>:</td>
                                        <td>
                                            <b className="uppercase">
                                                {props.data.name}
                                            </b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>2. Alamat</td>
                                        <td width={15}>:</td>
                                        <td>
                                            {props.data.alamat} Rt.
                                            {props.data.rt} Rw.{props.data.rw}
                                            <br />
                                            Kel.{" "}
                                            <span className="capitalize">
                                                {props.data.kelurahan.toLowerCase()}
                                            </span>{" "}
                                            Kec.{" "}
                                            <span className="capitalize">
                                                {props.data.kecamatan.toLowerCase()}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>3. Akta Notaris</td>
                                        <td width={15}>:</td>
                                        <td>
                                            <b>{props.data.notaris}</b>
                                            <br />
                                            Nomor: {props.data.nomor_akta}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>4. Nama Ketua</td>
                                        <td width={15}>:</td>
                                        <td>
                                            <b>{props.data.ketua}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>
                                            5. Jenis Penyelenggaraan Kesos
                                        </td>
                                        <td width={15}>:</td>
                                        <td>
                                            Penanganan Kesejanteraan Sosial
                                            {}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>6. Status</td>
                                        <td width={15}>:</td>
                                        <td>{"sdfsdf fsdfds"}</td>
                                    </tr>
                                    <tr>
                                        <td width={300}>
                                            7. Lingkup Wilayah Kerja
                                        </td>
                                        <td width={15}>:</td>
                                        <td>
                                            {props.data.lingkup}{" "}
                                            {generateLingkupLast(
                                                props.data.lingkup_id
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width={300}>8. Tipe</td>
                                        <td width={15}>:</td>
                                        <td>C</td>
                                    </tr>
                                    <tr>
                                        <td width={300}>9. Masa Berlaku</td>
                                        <td width={15}>:</td>
                                        <td>
                                            <b>
                                                {format(
                                                    new Date(
                                                        props.data.tanggal_expire
                                                    ),
                                                    "dd MMMM yyyy",
                                                    {
                                                        locale: indonesia,
                                                    }
                                                )}
                                            </b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="middle-footer">
                            <p className="font-roboto-slab text-sm text-justify">
                                Telah melaksanakan Daftar Ulang sebagai Lembaga
                                Kesejahteraan Sosial (LKS) yang sewaktu-waktu
                                dapat dibatalkan apabila dalam Penyelenggaraan
                                Kesejahteraan Sosial melanggar ketentuan
                                peraturan perundang-undangan, serta wajib
                                melakukan daftar ulang I (satu) tahun sekali dan
                                mengirimkan laporan pelaksanaan kegiatan
                                setahun.
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="w-1/2"></div>
                        <div className="w-1/2 flex flex-col items-center">
                            <p>Bandung, 13 September 2011</p>
                            <p className="uppercase font-bold text-base mt-2">
                                Kepala Dinas Sosial <br />
                                Kota Bandung
                            </p>

                            <p className="uppercase font-bold text-base mt-24">
                                Dr. Tono Rusdiawan
                            </p>
                            <p>Pembina Utama Muda</p>
                            <p>NIP: 100200200003</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TandaDaftarYayasan;
