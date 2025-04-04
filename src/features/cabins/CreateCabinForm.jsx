import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
        const { id: editId, ...editValues } = cabinToEdit;
        const isEditSession = Boolean(editId);

        const { register, handleSubmit, reset, watch, formState } = useForm({
                defaultValues: isEditSession ? editValues : {},
        });
        const { errors } = formState;
        const regularPrice = watch("regularPrice"); // 🛠 Theo dõi regularPrice real-time
        const queryClient = useQueryClient(); // 🛠 Sửa lỗi chính tả

        // Create Cabin
        const { isCreating, createCabin } = useCreateCabin();

        // Edit cabin

        const { isEditing, editCabin } = useEditCabin();

        const isWorking = isCreating || isEditing;

        function onSubmit(data) {
                const image = !data.image
                        ? null
                        : typeof data.image === "string"
                        ? data.image
                        : data.image.length > 0
                        ? data.image[0]
                        : null;

                if (isEditSession)
                        editCabin(
                                { newCabinData: { ...data, image }, id: editId },
                                {
                                        onSuccess: () => {
                                                reset();
                                                onClose?.();
                                        },
                                }
                        );
                else
                        createCabin(
                                { ...data, image },
                                {
                                        onSuccess: () => {
                                                reset();
                                                onClose?.();
                                        },
                                }
                        );
        }

        return (
                <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? "modal" : "regular"}>
                        <FormRow label="Cabin name" errors={errors?.name?.message}>
                                <Input
                                        type="text"
                                        id="name"
                                        {...register("name", { required: "This field is required" })}
                                        disabled={isWorking}
                                />
                        </FormRow>

                        <FormRow label="Maximum capacity" errors={errors?.maxCapacity?.message}>
                                <Input
                                        type="number"
                                        id="maxCapacity"
                                        {...register("maxCapacity", {
                                                required: "This field is required",
                                                min: { value: 1, message: "Capacity must be at least 1" },
                                        })}
                                        disabled={isWorking}
                                />
                        </FormRow>

                        <FormRow label="Regular price" errors={errors?.regularPrice?.message}>
                                <Input
                                        type="number"
                                        id="regularPrice"
                                        {...register("regularPrice", {
                                                required: "This field is required",
                                                min: { value: 100, message: "Price must be at least 100" },
                                        })}
                                        disabled={isWorking}
                                />
                        </FormRow>

                        <FormRow label="Discount" errors={errors?.discount?.message}>
                                <Input
                                        type="number"
                                        id="discount"
                                        defaultValue={0}
                                        {...register("discount", {
                                                required: "This field is required",
                                                validate: (value) =>
                                                        !regularPrice || value <= regularPrice
                                                                ? true
                                                                : "Discount should be less than the Price",
                                        })}
                                        disabled={isWorking}
                                />
                        </FormRow>

                        <FormRow label="Description for website" errors={errors?.description?.message}>
                                <Textarea
                                        id="description"
                                        defaultValue=""
                                        {...register("description", { required: "This field is required" })}
                                />
                        </FormRow>

                        <FormRow label="Cabin photo">
                                <FileInput
                                        id="image"
                                        accept="image/*"
                                        type="file"
                                        {...register("image", {
                                                required: isEditSession ? false : "This field is required",
                                        })}
                                />
                        </FormRow>

                        <FormRow>
                                <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
                                        Cancel
                                </Button>
                                <Button disabled={isWorking}>
                                        {isEditSession ? "Edit Cabin" : "Create new Cabin"}
                                </Button>
                        </FormRow>
                </Form>
        );
}

export default CreateCabinForm;
