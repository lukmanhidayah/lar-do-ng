import React, { useEffect, useState } from "react";
import Dashboard from "@/Layouts/Dashboard";
import { Head } from "@inertiajs/inertia-react";
import config from "@/config";
import Spinner from "@/Components/Spinner";
import axios from "axios";
import {
    initDataSubmitChangePassword,
    initDataVeriMessage,
} from "@/Utils/initData";
import MessageModal from "@/Components/modals/MessageModal";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import checkObject from "@/Utils/checkObject";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";

const ChangePassword = (props) => {
    const [dataSubmit, setDataSubmit] = useState({
        ...initDataSubmitChangePassword,
    });

    const [message, setMessage] = useState({
        ...initDataVeriMessage,
    });
    const onResetMessage = () => {
        setMessage({ ...initDataVeriMessage });
    };

    const onHandleChange = (e) => {
        setDataSubmit((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onReset = () => {
        setDataSubmit({
            ...initDataSubmitChangePassword,
        });
    };

    const onSubmit = () => {
        setDataSubmit((prevState) => ({
            ...prevState,
            isProcessing: true,
            isNull: false,
        }));

        // checking data
        if (
            !checkObject(
                dataSubmit,
                "current_password, new_password, confirm_password"
            ).status
        ) {
            setDataSubmit((prevState) => ({
                ...prevState,
                isProcessing: false,
                isNull: true,
            }));
            return;
        }

        // checking neww password not same with confirm password
        if (dataSubmit.new_password != dataSubmit.confirm_password) {
            setDataSubmit((prevState) => ({
                ...prevState,
                isProcessing: false,
                isNull: true,
            }));
            setMessage({
                show: true,
                error: true,
                message: "Confirm Password tidak sama dengan new password ",
            });
            return;
        }

        if (dataSubmit.new_password.length < 8) {
            setDataSubmit((prevState) => ({
                ...prevState,
                isProcessing: false,
                isNull: true,
            }));
            setMessage({
                show: true,
                error: true,
                message: "Password baru harus berisikan setidaknya 8 karakter",
            });
            return;
        }

        onPatchData();
    };

    const onPatchData = () => {
        const payload = {
            id: props.auth.user.id,
            new_password: dataSubmit.new_password,
            current_password: dataSubmit.current_password,
        };

        axios
            .patch(route(`settings/patch-change-password`), payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    setDataSubmit({ ...initDataSubmitChangePassword });
                    setMessage({
                        show: true,
                        error: false,
                        message:
                            res.data.message ||
                            `Perubahan katasandi berhasil dilakukan.`,
                    });
                } else {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message:
                            res.data.message ||
                            `Perubahan katasandi gagal dilakukan.`,
                    });
                }
            })
            .catch((err) => {
                if (err) {
                    setDataSubmit((prevState) => ({
                        ...prevState,
                        isProcessing: false,
                    }));
                    setMessage({
                        show: true,
                        error: true,
                        message:
                            err.message ||
                            `Perubahan katasandi gagal dilakukan.`,
                    });
                }
            });
    };

    return (
        <Dashboard
            auth={props.auth}
            totalNotify={props.totalNotify}
            imageUrl={props.identity?.logo}
        >
            <Head title="Change Password | Sipelaku Sosial" />
            <MessageModal onResetMessage={onResetMessage} message={message} />
            <div className="dashboard-content min-h-full">
                <div className="bg-white w-full overflow-hidden h-full relative rounded-md shadow">
                    <div className="pt-5 pb-1 px-5  flex flex-col md:flex-row justify-between items-start md:items-center border-b">
                        <div className="font-semibold text-lg mb-2 ">
                            Change Password
                        </div>
                    </div>
                    <div className=" flex flex-col justify-between ">
                        <div className="py-4 px-6">
                            <Input
                                id="current_password"
                                name="Current Password"
                                isNull={
                                    dataSubmit.isNull &&
                                    isNullOrEmpty(dataSubmit.current_password)
                                }
                                placeholder={"Masukan password saat ini..."}
                                type="password"
                                value={dataSubmit.current_password}
                                handleChange={onHandleChange}
                                required
                            />
                            <Input
                                id="new_password"
                                name="New Password"
                                isNull={
                                    dataSubmit.isNull &&
                                    isNullOrEmpty(dataSubmit.new_password)
                                }
                                type="password"
                                placeholder={"Masukan password baru..."}
                                value={dataSubmit.new_password}
                                handleChange={onHandleChange}
                                required
                            />
                            <Input
                                id="confirm_password"
                                name="Confirm Password"
                                isNull={
                                    dataSubmit.isNull &&
                                    isNullOrEmpty(dataSubmit.confirm_password)
                                }
                                type="password"
                                placeholder={"Konfirmasi password baru..."}
                                value={dataSubmit.confirm_password}
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="flex border-t justify-end w-full px-5">
                            <Button
                                title={"Reset"}
                                onClick={onReset}
                                disable={dataSubmit.isProcessing}
                                className="flex items-center bg-red-600 h-10 active:bg-red-800 py-2 px-4 rounded shadow text-white font-bold ml-2"
                            />
                            <Button
                                title={"Submit"}
                                processing={dataSubmit.isProcessing}
                                onClick={onSubmit}
                                className="flex items-center bg-primary-600 h-10 active:bg-primary-800 py-2 px-4 rounded shadow text-white font-bold ml-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ChangePassword;
