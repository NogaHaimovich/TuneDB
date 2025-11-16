import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/common/Button";
import Disc from "../../components/common/Disc";
import UserContext from "../../Contexts/UserContext";

import "./styles.scss";
import { signup, getUser } from "../../Services/userService";
import type { SignUpForm } from "../../types";
import InputField from "../../components/common/InputField";


const schema = z.object({
  username: z.string().min(3, { message: "Name should be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password should be at least 8 characters." }),
  confirmPassword: z
    .string()
    .min(8, { message: "Confirm Password should be at least 8 characters." }),    
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });




const SignUpPage = () => {
  const { setUser } = useContext(UserContext);
  const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpForm>({ resolver: zodResolver(schema) });
    const [formError, setFormError] = useState("")


    const onSubmit = async (formData: SignUpForm) => {
      try {
            await signup(formData);
            const user = getUser();
            setUser(user);
            window.location.href = "/";
            
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const resp = (err as { response?: { status?: number; data?: { message?: string } } }).response;
                if (resp?.status === 400 && resp.data?.message) {
                    setFormError(resp.data.message);
                    return;
                }
            }
            setFormError("Something went wrong. Please try again later.");
        }
    };


  return (
    <div className="signup">
      <div className="signup__left_section">
        <div className="signup__card">
          <h1>Let’s Get Started</h1>
          <p>Sign up</p>

          <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="text"
              id="username"
              placeholder="User Name"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />
             

            <InputField
              type="email"
              id="email"
              placeholder="Email Address"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}

            />

            <InputField
              type="password"
              id="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password")}
            />

            <InputField
              type="password"
              id="confirmPassword"
              placeholder="Enter Password Again"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </form>

          <p className="signup-text">
            Already registered? <a href="/signin">Sign in</a>
          </p>
        </div>
        {formError && <em className="form_error">{formError}</em>}
      </div>

      <div className="signup_right_section">
        <Disc direction="left" />
      </div>
    </div>
  );
};

export default SignUpPage;
