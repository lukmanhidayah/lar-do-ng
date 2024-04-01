const initData = {
    no_reg: "",
    name: "",
    email: "",
    singkatan_yayasan: "",
    alamat: "",
    kecamatan_id: "",
    kelurahan_id: "",
    rt: "",
    rw: "",
    fax: "",
    website: "",
    logo: "",
    visi: "",
    misi: "",
    tujuan: "",
    posisi_id: "",
    lingkup_id: "",
    lks_status_id: "",
    type_rehab_id: "",
    tempat_pendirian: "",
    nomor_handphone: "",
    tanggal_pendirian: "",
    ketua: "",
    sekretaris: "",
    bendahara: "",
    notaris: "",
    tanggal_akta: "",
    nomor_akta: "",
    nomor_pengesahan: "",
    keterangan_domisili: "",
    npwp: "",
    bank_id: "",
    nomor_rekening: "",
    nama_pemilik_rekening: "",
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
};

const initDataValidate = {
    data_umum: false,
    data_identitas: false,
    data_legalitas: false,
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
};

const initDataValidateComment = {
    comment_data_umum: "",
    comment_data_identitas: "",
    comment_data_legalitas: "",
    comment_file_akta_pendirian: "",
    comment_file_izin_pendirian: "",
    comment_file_adart: "",
    comment_file_susunan_pengurus: "",
    comment_file_surat_domisili: "",
    comment_file_npwp: "",
    comment_file_laporan_kegiatan: "",
    comment_file_data_klien: "",
    comment_foto_plang_yayasan: "",
    comment_file_visi_misi: "",
    comment_file_proker: "",
};

const initDataVeriMessage = {
    show: false,
    error: false,
    message: "",
};

const initDataSubmitChangePassword = {
    new_password: "",
    confirm_password: "",
    current_password: "",
    isNull: false,
    isProcessing: false,
};

const initDataSubmitConsumerApp = {
    type: "submit",
    id: 0,
    username: "",
    password: "",
    description: "",
    isProcessing: false,
    isNull: false,
    dataTemp: {
        id: 0,
        username: "",
        password: "",
        description: "",
    },
};

const generateStatus = (status_id) => {
    switch (status_id) {
        case 1:
            return "Menunggu LKS Melakukan permohonan kembali";
        case 2:
            return "Menunggu verifikasi Admin";
        case 3:
            return "Menunggu persetujuan Kepala Dinas";
        case 4:
            return "Menunggu LKS Melengkapi Revisi";
        case 5:
            return "Telah disetujui";
        default:
            return "";
    }
};

export {
    initData,
    initDataSubmitChangePassword,
    initDataValidate,
    initDataValidateComment,
    initDataVeriMessage,
    initDataSubmitConsumerApp,
    generateStatus,
};
