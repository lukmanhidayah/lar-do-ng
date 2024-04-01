import React from "react";

const PengurusLksCmp = ({data}) => {
    return (
        <div className="w-full rounded bg-white shadow">
            <div className="p-3 font-bold border-b text-md">Pengurus LKS</div>
            <div className="px-3">
                <table className="w-full profile-table">
                    <tbody>
                        <tr>
                            <td width={200}>Nama Ketua</td>
                            <td width={15}>:</td>
                            <td>{data.ketua}</td>
                        </tr>
                        <tr>
                            <td width={200}>Nama Sekretaris</td>
                            <td width={15}>:</td>
                            <td>{data.sekretaris}</td>
                        </tr>
                        <tr>
                            <td width={200}>Nama Bendahara</td>
                            <td width={15}>:</td>
                            <td>{data.bendahara}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PengurusLksCmp;
