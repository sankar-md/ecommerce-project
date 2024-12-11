import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { X } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: (
            <div className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-white bg-green-600 rounded-full p-0.5" />
              <span>{data?.payload?.message}</span>
            </div>
          ),
          duration: 3000,
        });
      } else {
        toast({
          title: (
            <div className="flex items-center">
              <X
                className="mr-2 h-6 w-8 text-red-700 bg-white rounded-full p-0.5"
                strokeWidth={3}
              />
              <span>
                {data?.payload?.message ||
                  "An error occurred! please try again!"}
              </span>
            </div>
          ),
          variant: "destructive",
          duration: 3000,
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome Back! <br />
          Let's Login to your account
        </h1>
        <p className="mt-2">
          Dont have an account?
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
