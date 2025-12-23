import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button/Button";
import Disc from "../../components/common/Disc/Disc";
import UserContext from "../../Contexts/UserContext";

import "./styles.scss";
import { isAuthenticated, setToken } from "../../utils/auth";
import type { SignInForm } from "../../types";
import InputField from "../../components/common/InputField/InputField";
import { useSignInUserMutation } from "../../store";

const schema = z.object({
  email: z.string().email({ message: "Please enter valid email address." }).min(3),
  password: z.string().min(8, { message: "Password should be at least 8 characters." }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/";
  const { setUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

  const [formError, setFormError] = useState("");

  const [signInMutation] = useSignInUserMutation();

  useEffect(() => {
    if (isAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  const onSubmit = async (formData: SignInForm) => {
    try {
      setFormError("");
      const response = await signInMutation(formData).unwrap();
      setToken(response.token);
      setUser(response.user);
      navigate(from);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = (err as { data?: { message?: string }; status?: number }).data;
        if (errorData?.message) {
          setFormError(errorData.message);
          return;
        }
      }
      setFormError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signin">
      <div className="signin__left_section">
        <Disc direction="right" />
      </div>

      <div className="signin__right_section">
        <div className="signin__card">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>

          {formError && <p className="error-text">{formError}</p>}

          <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              placeholder="Email Address"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <InputField
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            <div className="signin__options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/">Forgot password?</a>
            </div>

            <Button variant="primary" type="submit">Sign In</Button>
          </form>

          <p className="signup-text">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
