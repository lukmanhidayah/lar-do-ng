import DeleteIcon from "@/Icon/DeleteIcon";
import Button from "../Button";
import { Modal } from "../Dashboard/Modal";

const DeleteModal = ({
    dataSubmit,
    onCancel,
    onDelete,
    onBackdropClick,
    title,
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
                  flex
                  flex-col
                  items-center
                  bg-white
                  rounded
                  overflow-hidden
                  overflow-y-auto
              `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div>
                    <div
                        className={`
                          bg-red-100
                          bg-opacity-20
                          w-full
                          h-40
                          flex
                          justify-center
                          items-center
                      `}
                    >
                        <DeleteIcon
                            height={100}
                            width={100}
                            className="text-red-500"
                        />
                    </div>
                    <div className="p-4 px-6 text-center">
                        <p className="text-xl font-semibold">{title}</p>
                        <p className="text-md mt-2">
                            Data{" "}
                            <span className="font-semibold">
                                "{dataSubmit.name}"
                            </span>
                            {" akan dihapus."}
                            <br />
                            Apakah Anda yakin?
                        </p>
                    </div>
                    <div className="flex w-full justify-between border-t">
                        <Button
                            onClick={onCancel}
                            disable={dataSubmit.isProcessing}
                            title="Tidak"
                            className={`
                              mb-0
                              mt-0
                              h-12
                              w-full
                              rounded-none
                              text-red-500
                              text-sm
                              bg-white
                              shadow-none
                              active:bg-opacity-10
                              hover:shadow-none
                            `}
                        />
                        <Button
                            spinnerType="primary-spinner"
                            onClick={onDelete}
                            processing={dataSubmit.isProcessing}
                            title={"Ya"}
                            typeSpinner="primary-spinner"
                            className={`
                              mb-0
                              mt-0
                              h-12
                              rounded-none
                              w-full
                              text-sm
                              bg-white
                              shadow-none
                              text-primary-800
                              active:bg-opacity-10
                              hover:shadow-none
                            `}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
