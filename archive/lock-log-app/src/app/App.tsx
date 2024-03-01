import { Routes, Route } from "react-router-dom";
import { Dashboard } from './Dashboard';
import { Devices } from "./Devices";
import { NotFound } from "./NotFound";
import { Login } from "./Login";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { authAction } from "../store/auth-slice";
import Cookies from "js-cookie";
import { LockDevice } from "./DeviceTypes/LockDevice";
import { LampDevice } from "./DeviceTypes/LampDevice";

export const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authAction.replaceAuthData(Cookies.get('jwt_data')));
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lock/:deviceId" element={<LockDevice />} />
        <Route path="/lamp/:deviceId" element={<LampDevice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
