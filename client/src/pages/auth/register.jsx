import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config/index";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
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
        navigate("/auth/login");
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
          Create New Account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="ml-1 font-medium text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
