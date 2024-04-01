<?php

namespace App\Http\Controllers;

use ParseCsv\Csv;

/**
 * Get raw data from CSV Files on /src/data/csv.
 */
class RawDataGetter
{
    /**
     * Raw Data file path.
     *
     * @return string
     */
    protected static $path = __DIR__ . '/MasterData';

    /**
     * Get provinces data.
     *
     * @return array
     */
    public static function getProvinsi()
    {
        $result = self::getCsvData(self::$path . '/provinsi.csv');

        return $result;
    }

    /**
     * Get regencies data.
     *
     * @return array
     */
    public static function getKabupatenKota()
    {
        $result = self::getCsvData(self::$path . '/kabupaten_kota.csv');

        return $result;
    }

    /**
     * Get districts data.
     *
     * @return array
     */
    public static function getKecamatan()
    {
        $result = self::getCsvData(self::$path . '/kecamatan.csv');

        return $result;
    }

    /**
     * Get villages data.
     *
     * @return array
     */
    public static function getKelurahan()
    {
        $result = self::getCsvData(self::$path . '/kelurahan.csv');

        return $result;
    }

    /**
     * Get villages data.
     *
     * @return array
     */
    public static function getBank()
    {
        $result = self::getCsvData(self::$path . '/bank.csv');

        return $result;
    }

    /**
     * Get Data from CSV.
     *
     * @param string $path File Path.
     *
     * @return array
     */
    public static function getCsvData($path = '')
    {
        $csv = new Csv();
        $csv->auto($path);

        return $csv->data;
    }
}
