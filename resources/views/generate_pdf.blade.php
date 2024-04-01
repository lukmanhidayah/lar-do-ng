<html lang="id">

<head>






  <title inertia="">Sipelaku</title>
  <!-- <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500;600;700&display=swap" rel="stylesheet" /> -->

  <!-- Fonts -->


  <!-- Styles -->
  <!-- <link rel="stylesheet" href="{{ mix('css/app.css') }}"> -->

  <!-- <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"> -->

  <!-- Scripts -->

  <style>
    blockquote,
    dl,
    dd,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    figure,
    p,
    pre {
      margin: 0;
    }

    @page {
      size: 230mm 350mm;
      margin: 0px !important;
      padding: 0 !important;
    }

    /* body { margin: 0px !important; padding: 0 !!important; } */

    .tdy-body {
      width: 100%;
      height: 350mm;
      min-width: 230mm;
      background: url(https://dl.dropboxusercontent.com/s/6z513uxo060tux1/image1.jpg) white;
      background-repeat: no-repeat;
      background-size: 230mm 350mm;
    }

    .tdy-container {
      border-radius: 0.25rem;
      padding: 3.5rem 4rem;
      width: 195mm;
      min-width: 195mm;
      height: 266mm;
    }

    .tdy-content {
      padding: 1rem;
      border-radius: 2px 5px 5px 2px/5px 5px 5px 5px;
      height: 266mm;
      /* background: url(https://i.ibb.co/SfgBc6X/bg-tdy.png) white;
      background-repeat: repeat;
      background-size: 50px 40px; */
    }

    .tdy-header {
      width: 100%;
      text-align: center;
      border-bottom-width: 4px !important;
      border-bottom-style: double;
      border-color: rgba(0, 0, 0, 1);
      font-family: "Roboto Slab", serif;
    }

    .tdy-middle {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .middle-desc,
    .middle-footer {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    .tdy-container td,
    .tdy-container td b {
      font-size: 11pt;
    }

    .tdy-container td,
    .tdy-container td b {
      font-family: "Roboto Slab", serif;
    }

    .tdy-container tr>td {
      padding-bottom: 10px;
      vertical-align: top;
    }

    .tdy-container p {
      text-align: center;
      font-size: 11pt;
      font-family: "Roboto Slab", serif;
    }

    .uppercase {
      text-transform: uppercase !important;
    }

    .font-bold {
      font-weight: bold !important
    }

    .text-center {
      text-align: center !important;
    }

    .text-justify {
      text-align: justify !important;
    }

    .w-full {
      width: 100% !important;
    }

    .not-italic {
      font-style: normal !important;
    }

    .text-sm {
      font-size: 11pt !important;
    }

    .text-base {
      font-size: 12pt !important;
    }

    .text-lg {
      font-size: 14pt !important;
    }

    .text-xl {
      font-size: 16pt !important;
    }

    .w-1\/2 {
      width: 50% !important;
    }

    .mt-2 {
      margin-top: 0.5rem !important;
    }

    .mt-24 {
      margin-top: 6rem !important;
    }

    .px-8 {
      padding-left: 2rem !important;
      padding-right: 2rem !important;
    }
    
    .px-10 {
      padding-left: 90px !important;
      padding-right: 90px !important;
    }

    .font-roboto-slab {
      font-family: "Roboto Slab", serif;
    }

    .ttd-container {
      float: right !important;
      margin: 0 3.5rem
    }

    .ttd-content {
      width: 260px;

    }

    .ttd-elektronik {
      border: 1px solid #000;
      padding: 5px;
    }

    .nomor-pendaftaran {
      padding-top: 5px
    }

    .capitalize {
      text-transform: capitalize !important
    }

    .lowercase {
      text-transform: lowercase !important
    }

    .lowercase::first-letter {
      text-transform: capitalize !important;
    }

    .text-left {
      text-align: left !important;
    }

    .footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .img-bdg {
      position: absolute;
      padding-top: 10px;
      width: 100px;
      height: 100px;
      top: 70px;
    }
    .z-100{
      z-index: 100;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  </style>
</head>

<body class="font-sans antialiased">
  <div id="app">
    <div class="tdy-body bg-blue-10 w-full min-h-screen flex justify-center py-4">
      <div class="tdy-container">
        <div class="tdy-content">
          <div class="tdy-header">
            <h1 class="text-lg uppercase font-roboto-slab ">Pemerintah Kota Bandung</h1>
            <h2 class="text-2xl uppercase font-bold font-roboto-slab">Dinas Sosial</h2>
            <div class="img-bdg">

              <img src="https://dl.dropboxusercontent.com/s/vgnxoin29e9hcju/image1.jpg" alt="img-bdg" class="w-full" />
            </div>
            <address class="text-base not-italic text-center font-roboto-slab px-10 z-100">Jl. Babakan Karet (Belakang Rusunawa Rancacili) Kel. Derwati Kec. Rancasari Kota Bandung.</address>
          </div>
          <div class="tdy-middle">
            <div class="title-middle font-roboto-slab">
              <h3 class="font-roboto-slab text-center font-bold">Penetapan Terdaftar<br>Sebagai Lembaga Kesejahteraan Sosial (LKS)</h3>
              <p class="font-roboto-slab text-center nomor-pendaftaran">Nomor: <b class="font-roboto-slab">{{$no_reg}}</b></p>
            </div>
            <div class="middle-desc">
              <p class="font-roboto-slab text-sm text-justify">Berdasarkan Undang-Undang RI No.11 Tahun 2009 tentang Kesejanteraan Sosial dan Peraturan Daerah Kota Bandung Nomor: 24 Tahun 2012 Tentang Penyelenggaraan dan Penanganan Kesejahteraan Sosial, Kepala Dinas Sosial Kota Bandung Menyatakan Bahwa:</p>
            </div>
            <div class="middle-content">
              <table class="w-full profile-table">
                <tbody>
                  <tr>
                    <td width="300">1. Nama Lembaga</td>
                    <td width="15">:</td>
                    <td><b class="uppercase">{{$name}}</b></td>
                  </tr>
                  <tr>
                    <td width="300">2. Alamat</td>
                    <td width="15">:</td>
                    <td class="capitalize">{{$alamat}} Rt.{{$rt}} Rw.{{$rw}}<br /> Kel. {{strtolower($kelurahan)}} Kec. {{strtolower($kecamatan)}}</td>
                  </tr>
                  <tr>
                    <td width="300">3. Akta Notaris</td>
                    <td width="15">:</td>
                    <td><b class="uppercase">{{$notaris}}</b><br />Nomor: {{$nomor_akta}}</td>
                  </tr>
                  <tr>
                    <td width="300">4. Nama Ketua</td>
                    <td width="15">:</td>
                    <td class="uppercase"><b>{{$ketua}}</b></td>
                  </tr>
                  <tr>
                    <td width="300">5. Jenis Penyelenggaraan Kesos</td>
                    <td width="15">:</td>
                    <td>Penanganan Kesejanteraan Sosial <span class="capitalize">{{$type_rehab}}</span></td>
                  </tr>
                  <tr>
                    <td width="300">6. Status</td>
                    <td width="15">:</td>
                    <td>{{$lks_status}}</td>
                  </tr>
                  <tr>
                    <td width="300">7. Lingkup Wilayah Kerja</td>
                    <td width="15">:</td>
                    <td>{{$lingkup}}
                      @if ($lingkup_id === 2)
                      Jawa Barat
                      @elseif ($lingkup_id === 3)
                      Bandung
                      @endif
                    </td>
                  </tr>
                  <tr>
                    <td width="300">8. Tipe</td>
                    <td width="15">:</td>
                    <td>{{$user_type}}</td>
                  </tr>
                  <tr>
                    <td width="300">9. Masa Berlaku</td>
                    <td width="15">:</td>
                    <td><b>{{Carbon\Carbon::parse($tanggal_perpanjang)->isoFormat('D MMMM Y')}} - {{Carbon\Carbon::parse($tanggal_expire)->isoFormat('D MMMM Y');}}
                      </b></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="middle-footer">
              <p class="font-roboto-slab text-sm text-justify">Telah melaksanakan pendaftaran sebagai Lembaga Kesejahteraan Sosial (LKS) yang sewaktu-waktu dapat dibatalkan apabila dalam Penyelenggaraan Kesejahteraan Sosial melanggar ketentuan peraturan perundang-undangan, serta wajib melakukan daftar ulang I (satu) tahun sekali dan mengirimkan laporan pelaksanaan kegiatan setahun.</p>
            </div>
          </div>

          <div class="footer">
            <div class="ttd-container">
              <div class="ttd-content">
                <p>Bandung, {{Carbon\Carbon::parse($tanggal_perpanjang)->isoFormat('D MMMM Y')}}</p>
                <div class="ttd-elektronik">
                  <p class="font-bold w-full text-left">Ditandatangani secara elektronik oleh:</p>
                  <p class="uppercase font-bold w-full mt-2 text-left">Kepala Dinas Sosial Kota Bandung</p>
                  <p class="uppercase font-bold text-left mt-2 w-full">DR. TONO RUSDIANTONO. M.SI</p>
                  <p class="font-bold text-left">Pembina Utama Muda</p>
                  <p class="font-bold text-left">NIP: 19651118 198603 1 005</p>
                </div>

              </div>
            </div>
            <div style="float: right; margin-top: 20px; margin-right: -50px">
              <img src="data:image/png;base64, {!! base64_encode(QrCode::size(125)->generate(request()->getSchemeAndHttpHost().'/tanda-daftar-yayasan/'.$url_slug)) !!}" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>