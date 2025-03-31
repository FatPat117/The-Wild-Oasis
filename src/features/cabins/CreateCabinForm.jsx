import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm() {
        const { register, handleSubmit, reset, getValues, formState } = useForm();
        const { errors } = formState;

        const queryCilent = useQueryClient();
        const { mutate, isLoading: isCreating } = useMutation({
                mutationFn: (newCabin) => createCabin(newCabin),
                onSuccess: () => {
                        toast.success("New cabin successfully created");
                        queryCilent.invalidateQueries({ queryKey: ["cabins"] });
                        reset();
                },
                onError: (err) => toast.error(err.message),
        });

        function onSubmit(data) {
                mutate(data);
        }
        function onError(errors) {}
        return (
                <Form onSubmit={handleSubmit(onSubmit, onError)}>
                        <FormRow label="Cabin name" errors={errors?.name?.message}>
                                <Input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                                required: "This field is required",
                                        })}
                                        disabled={isCreating}
                                />
                        </FormRow>

                        <FormRow label="Maximum capacity" errors={errors?.maxCapacity?.message}>
                                <Input
                                        type="number"
                                        id="maxCapacity"
                                        {...register("maxCapacity", {
                                                required: "This field is required",
                                                min: {
                                                        value: 1,
                                                        message: "Capacity must be at least 1",
                                                },
                                        })}
                                        disabled={isCreating}
                                />
                        </FormRow>

                        <FormRow label="Regular price" errors={errors?.regularPrice?.message}>
                                <Input
                                        type="number"
                                        id="regularPrice"
                                        {...register("regularPrice", {
                                                required: "This field is required",
                                                min: {
                                                        value: 100,
                                                        message: "Price must be at least 100",
                                                },
                                        })}
                                        disabled={isCreating}
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
                                                        value <= getValues().regularPrice ||
                                                        "Discount should be less than the Price",
                                        })}
                                        disabled={isCreating}
                                />
                        </FormRow>

                        <FormRow label="Description for website" errors={errors?.description?.message}>
                                <Textarea
                                        type="number"
                                        id="description"
                                        defaultValue=""
                                        {...register("description", {
                                                required: "This field is required",
                                        })}
                                />
                        </FormRow>

                        <FormRow label="Cabin photo">
                                <FileInput id="image" accept="image/*" />
                        </FormRow>

                        <FormRow>
                                {/* type is an HTML attribute! */}
                                <Button variation="secondary" type="reset">
                                        Cancel
                                </Button>
                                <Button disabled={isCreating}>Add cabin</Button>
                        </FormRow>
                </Form>
        );
}

export default CreateCabinForm;
