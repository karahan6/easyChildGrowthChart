import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

import * as Permissions from "expo-permissions";

const useCameraPermissions = (): [{hasCameraPermission: boolean, type: any}, Function] => {
    const [cameraState, setCameraState] = useState({
        hasCameraPermission: false,
        type: Camera.Constants.Type.back
      });

    useEffect(() => {
        fetchCameraPermissionAPI();
      }, [])
      
    const fetchCameraPermissionAPI = async () => {
        const resultCamera = await Permissions.askAsync(Permissions.CAMERA);
        const resultRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        let status =
          resultCamera.status === resultRoll.status ? resultCamera.status : "";
        setCameraState({
          hasCameraPermission: status === "granted",
          type: Camera.Constants.Type.back
        });
      };
    return [cameraState, fetchCameraPermissionAPI];
  };
  
  export default useCameraPermissions;