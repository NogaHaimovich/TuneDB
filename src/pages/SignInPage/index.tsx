import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Disc from "../../components/Disc";
import InputField from "../../components/InputField";
import UserContext from "../../Contexts/UserContext";

import "./styles.scss";
import { getUser, signin } from "../../Services/userService";
import type { SignInForm } from "../../types";

const schema = z.object({
  email: z.string().email({ message: "Please enter valid email address." }).min(3),
  password: z.string().min(8, { message: "Password should be at least 8 characters." }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from || "/";
  const { setUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(schema),
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (getUser()) {
      window.location.href = "/";
    }
  }, []);

  const onSubmit = async (formData: SignInForm) => {
    try {
      await signin(formData);
      const user = getUser();
      setUser(user);
      navigate(from);
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      } else {
        setFormError("Something went wrong. Please try again later.");
      }
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
