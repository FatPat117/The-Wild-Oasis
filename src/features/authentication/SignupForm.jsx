import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
        const { signup, isLoading } = useSignup();
        const { register, formState, handleSubmit, watch, reset } = useForm();
        const password = watch("password");
        const { errors } = formState;

        function onSubmit({ fullName, email, password }) {
                signup(
                        { fullName, email, password },
                        {
                                onSettled: () => {
                                        reset();
                                },
                        }
                );
        }

        return (
                <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormRow label="Full name" errors={errors?.fullName?.message}>
                                <Input
                                        type="text"
                                        id="fullName"
                                        disabled={isLoading}
                                        {...register("fullName", {
                                                required: "This field is required",
                                        })}
                                />
                        </FormRow>

                        <FormRow label="Email address" errors={errors?.email?.message}>
                                <Input
                                        type="email"
                                        id="email"
                                        disabled={isLoading}
                                        {...register("email", {
                                                required: "This field is required",
                                        })}
                                />
                        </FormRow>

                        <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
                                <Input
                                        type="password"
                                        id="password"
                                        disabled={isLoading}
                                        {...register("password", {
                                                required: "This field is required",
                                                minLength: {
                                                        value: 8,
                                                        message: "Password needs a minimum of 8 characters",
                                                },
                                        })}
                                />
                        </FormRow>

                        <FormRow label="Repeat password" errors={errors?.passwordConfirm?.message}>
                                <Input
                                        type="password"
                                        id="passwordConfirm"
                                        disabled={isLoading}
                                        {...register("passwordConfirm", {
                                                required: "This field is required",
                                                validate: (value) => value === password || "Passwords need to match",
                                        })}
                                />
                        </FormRow>

                        <FormRow>
                                {/* type is an HTML attribute! */}
                                <Button variation="secondary" type="reset" disabled={isLoading}>
                                        Cancel
                                </Button>
                                <Button disabled={isLoading}>Create new user</Button>
                        </FormRow>
                </Form>
        );
}

export default SignupForm;
