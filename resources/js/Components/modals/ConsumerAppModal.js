import CloseIcon from "@/Icon/CloseIcon";
import isNullOrEmpty from "@/Utils/isNullOrEmpty";
import React from "react";
import Button from "../Button";
import CustomTextArea from "../CustomTextArea";
import { Modal } from "../Dashboard/Modal";
import Input from "../Input";

const ConsumerAppModal = ({
    dataSubmit,
    onBackdropClick,
    onHandleChange,
    onSubmit,
    onReset,
    type = "submit",
    generatePassword,
}) => {
    return (
        <Modal
            animation="animate-bounce-in"
            backdropClick={
                !dataSubmit.isProcessing ? onBackdropClick : undefined
            }
        >
            <div
                className={`
                  w-full
                  max-h-full
                  bg-white
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  overflow-y-auto
                  rounded
                  sm:w-4/6
                  lg:w-1/2
                  lg:max-w-2xl
                `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div>
                    <div
                        className={`
                          border-b
                          p-4
                          sticky
                          top-0
                          bg-white
                          z-100
                        `}
                    >
                        <div className="w-full flex items-center justify-between">
                            <p className="font-semibold text-lg">
                                {type === "edit" ? "Edit" : "Add"} Data Consumer
                            </p>
                            <div
                                onClick={
                                    !dataSubmit.isProcessing
                                        ? onBackdropClick
                                        : undefined
                                }
                                className="h-7 w-7 flex items-center justify-center bg-blue-10 cursor-pointer rounded"
                            >
                                <CloseIcon
                                    width={16}
                                    height={16}
                                    className="stroke-current text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        {/* code here */}
                        <Input
                            id="username"
                            name="Username Basic-Auth"
                            type="text"
                            isNull={
                                dataSubmit.isNull &&
                                isNullOrEmpty(dataSubmit.username)
                            }
                            value={dataSubmit.username}
                            handleChange={onHandleChange}
                            required
                        />
                        <Input
                            id="password"
                            name="Password Basic-Auth"
                            type="text"
                            isNull={
                                dataSubmit.isNull &&
                                isNullOrEmpty(dataSubmit.password)
                            }
                            handleChange={onHandleChange}
                            value={dataSubmit.password}
                            note={
                                <div className="flex justify-end">
                                    <p
                                        onClick={generatePassword}
                                        className="font-semibold text-xs cursor-pointer mt-1 bg-yellow-700 active:bg-yellow-800 text-white py-1 px-2 rounded shadow select-none"
                                    >
                                        Generate Password
                                    </p>
                                </div>
                            }
                            required
                        />
                        <CustomTextArea
                            id="description"
                            name="Deskripsi Consumer"
                            type="text"
                            isNull={
                                dataSubmit.isNull &&
                                isNullOrEmpty(dataSubmit.description)
                            }
                            value={dataSubmit.description}
                            handleChange={onHandleChange}
                            mt="0"
                            required
                        />
                    </div>
                </div>
                <div
                    className={`
                      border-t
                      py-2
                      px-5
                      flex
                      gap-x-4
                      justify-end
                      sticky
                      bottom-0
                      bg-white
                      z-100
                  `}
                >
                    <Button
                        onClick={onReset}
                        disable={dataSubmit.isProcessing}
                        title="Reset"
                        className={`
                          mb-0
                          mt-0
                          h-9
                          w-24
                          text-white
                          text-sm
                          bg-red-500
                          active:bg-red-600
                        `}
                    />
                    <Button
                        onClick={onSubmit}
                        processing={dataSubmit.isProcessing}
                        title={type === "edit" ? "Edit" : "Submit"}
                        className={`
                          mb-0
                          mt-0
                          h-9
                          w-24
                          text-white
                          text-sm
                          bg-primary-600
                          active:bg-primary-800
                        `}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConsumerAppModal;
