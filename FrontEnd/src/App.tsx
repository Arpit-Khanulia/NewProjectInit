// context api
// import { useEffect } from "react";
import { useThemeContext } from "./context/Themecontext";
import { useUserContext } from "./context/UserContext";
import { useIsError } from "./hooks/isErrorHook";
import { useIsSuccess } from "./hooks/isSuccessHook";
// redux
import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counterSlice";
import { useAppDispatch, useAppSelector } from "./hooks/ReduxHooks";

// rtk query
import { useLazyDashboardQuery } from "./services/userApi";
import { useRegisterMutation } from "./services/userApi";
import { useLoginMutation } from "./services/userApi";

const App = () => {
  // context
  const { theme, setTheme } = useThemeContext();
  const { user, setUser } = useUserContext();

  // redux
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector((state) => state.value.value);

  // rtk query (GET)
  // const {data,isSuccess} = useGetUsersQuery();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setTheme("purple") : setTheme("blue");
    setUser({
      name: "arpit",
      email: "arpitkhanulia7@gmail.com",
      password: "password",
    });
  };

  const [register, { data, isLoading, isError, isSuccess, error }] =useRegisterMutation();
  const [login,{data:loginData,isSuccess:loginIsSuccess,isError:loginIsError,error:loginError}] = useLoginMutation(); 

  const registerUser = async () => {
    console.log("user registered !!");
    isError;
    const newUser = {
      username: "kkbssdasdfffkh",
      email: "mkkbsdfkfhfs@gmail.com",
      password: "tempPass@123",
    };
    await register(newUser);
  };

  useIsError(isError, error);
  useIsSuccess(isSuccess, data);



  console.log(error);

  const loginHandle = async()=>{

    const newUser = {
      username: "kkbssdasdfffkh",
      email: "mkkbsdfkfhfs@gmail.com",
      password: "tempPass@123",
    };
    await login(newUser);

  }

  useIsError(loginIsError,loginError);
  useIsSuccess(loginIsSuccess,loginData)
  
  
  
  console.log(loginData);
  
  const [goToDashboard,{data:dashboardData,isSuccess:isDashboardSuccess,isError:isDashboardError,error:dashboardError} ]= useLazyDashboardQuery();

  const dashboardHandler = () =>{
    goToDashboard();
  } 
  useIsSuccess(isDashboardSuccess,dashboardData);
  useIsError(isDashboardError,dashboardError);

  console.log(dashboardData);
  

  
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>{theme}</div>
          <div>{user.email}</div>
          <input type="checkbox" onChange={handleChange} />

          <div>{counterValue}</div>
          <button onClick={() => dispatch(increment())}>+</button>
          <button onClick={() => dispatch(decrement())}>-</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>
            increment by 5
          </button>

          <button onClick={() => registerUser()}>Register User</button>
          <button onClick={()=>loginHandle()}>Login</button>
          <button onClick={()=>dashboardHandler()}>Dashboard</button>
        </div>
      )}
    </>
  );
};
export default App;
