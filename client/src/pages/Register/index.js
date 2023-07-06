import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(user);
      if (response.success) {
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="bg-white p-5 w-[450px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center text-primary uppercase">
            Matrix Master Community - Register
          </h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password (min 6 character)"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <Button
            title="Register"
            onClick={register}
            disabled={
              user.name.length < 3 ||
              user.email.length < 3 ||
              user.password.length < 6
            }
          />

          <Link to="/login" className="text-center text-primary underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
