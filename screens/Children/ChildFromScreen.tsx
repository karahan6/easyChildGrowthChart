import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import * as ImgPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { StackNavigationProp } from '@react-navigation/stack';
import { ChildrenParamList } from '../../types';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { HelperText, TextInput, Text, RadioButton, Modal, Avatar } from 'react-native-paper';
import { formatMessage } from '../../helpers/i18n';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { Gender } from '../../models/Gender';
import { useStoreActions, useStoreState } from '../../store';
import { navigationService } from '../../navigation/NavigationService';


type ChildFormScreenNavigationProp = StackNavigationProp<ChildrenParamList, 'ChildFormScreen'>;
type ChildFormScreenRouteProp = RouteProp<ChildrenParamList, 'ChildFormScreen'>;

type ChildFormScreenProps = {
  navigation: ChildFormScreenNavigationProp;
  route: ChildFormScreenRouteProp
};

let childFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Child.Form.Name.HelperText"),
  birthday: Yup.string()
    .required("Child.Form.Birthday.HelperText"),
});

interface IChildForm {
  name: string | undefined,
  birthDay: Date,
  note: string | undefined
  gender: Gender
}
const inputTheme = {
  colors: {
    primary: "#119DD8"
  }
};

const ChildFormScreen = ({ navigation, route }: ChildFormScreenProps) => {
  const [checked, setChecked] = useState('girl');
  const [imageUri, setImageUri] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const nameRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [cameraState, setCameraState] = useState({
    hasCameraPermission: false,
    type: Camera.Constants.Type.back
  });
  useEffect(()=>{
    fetchCameraPermissionAPI();
  },[])
  const saveChild = useStoreActions(actions => actions.child.saveChild);

  navigation.setOptions({ title: route.params.id == 0 ? "Add Child" : "Edit Child" });

  const handleSubmit = (values: any) => {
    saveChild({...values, isSent:false, photo: imageUri});
    navigationService.navigate("ChildrenScreen", {});
  }
  //set initial values depend on id in useeffect
  let initialValues: IChildForm = {
    name: undefined,
    birthDay: new Date(),
    note: undefined,
    gender: Gender.Girl
  }

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

  const attachImage = async (uri: string) => {
    const fileName = uri.split("/").pop() ?? "";
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: uri,
        to: newPath
      });
      setImageUri(newPath);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = cameraState.hasCameraPermission;
    if (!hasPermission) {
      fetchCameraPermissionAPI();
    }
    const image = await ImgPicker.launchCameraAsync({
      allowsMultipleSelection: true,
      base64: true,
      aspect: [16, 9],
      quality: 0.5
    });
    if (!image.cancelled) {
      await attachImage(image.uri);
    }
    setShowModal(false);
  };


  const takeGalleryHandler = async () => {
    const hasPermission = cameraState.hasCameraPermission;
    if (!hasPermission) {
      fetchCameraPermissionAPI();
    }
    const image = await ImgPicker.launchImageLibraryAsync({
      aspect: [16, 9],
      quality: 0.5
    });
    if (!image.cancelled) {
      await attachImage(image.uri);
    }
    setShowModal(false);
  };

  const onDateChange = (event: Event, selectedDate: Date | undefined, formProps: FormikProps<IChildForm>) => {
    const currentDate = selectedDate || initialValues.birthDay;
    //TODO check in IOS
    setShowDatePicker(Platform.OS === 'ios');
    if (nameRef && nameRef.current != null)
      nameRef.current.focus();
    formProps.setFieldValue("birthday", currentDate);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={childFormSchema}
      onSubmit={handleSubmit}
    >
      {formProps => (
        <View style={styles.container}>

          <TextInput
            ref={nameRef}
            label={formatMessage("Child.Form.Name")}
            value={formProps.values.name}
            onChangeText={formProps.handleChange("name")}
            style={styles.text}
            error={
              formProps.touched.name &&
              formProps.submitCount > 0 &&
              formProps.errors.name != null
            }
            theme={inputTheme}
          />
          {formProps.touched.name &&
            formProps.submitCount > 0 &&
            formProps.errors.name != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.name ? formatMessage("Child.Form.Name.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}

          <TextInput
            label={formatMessage("Child.Form.Birthday")}
            value={formProps.values.birthDay.toLocaleDateString()}
            onFocus={(e: any) => setShowDatePicker(true)}
            style={styles.text}

            error={
              formProps.touched.birthDay &&
              formProps.submitCount > 0 &&
              formProps.errors.birthDay != null
            }
            theme={inputTheme}
          />
          {formProps.touched.birthDay &&
            formProps.submitCount > 0 &&
            formProps.errors.birthDay != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.birthDay ? formatMessage("Child.Form.Birthday.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}
          {showDatePicker && <DateTimePicker
            mode="date"
            is24Hour={false}
            value={formProps.values.birthDay}
            onChange={(e, selectedDate) => onDateChange(e, selectedDate, formProps)}
          />}
          <Text style={{ marginTop: 20 }}>Gender</Text>
          <View>
            <RadioButton.Group onValueChange={formProps.handleChange("gender")} value={formProps.values.gender.toString()}>
              <View style={styles.radioButton}>
                <RadioButton value="1" color="#119DD8" />
                <Text>{formatMessage("Child.Form.Girl")}</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton value="2" color="#119DD8" />
                <Text>{formatMessage("Child.Form.Boy")}</Text>
              </View>
            </RadioButton.Group>
          </View>

          <TextInput
            label={formatMessage("Child.Form.Note")}
            value={formProps.values.note}
            onChangeText={formProps.handleChange("note")}
            style={styles.text}
            theme={inputTheme}
          />

          <Text style={{ marginTop: 20 }}>Photo</Text>
          <View style={{ width: 200 }}>
            {imageUri != "" ? <TouchableOpacity onPress={() => setShowModal(true)}>
              <Avatar.Image source={{uri:imageUri}} style={{marginTop: 10}} />
              </TouchableOpacity>:<AntDesign
              name="plussquareo"
              size={72}
              style={{ marginLeft: 20, marginTop: 10 }}
              color="gray"
              onPress={() => setShowModal(true)} />}
          </View>
          <Modal

            visible={showModal}
            onDismiss={() => setShowModal(false)}
          >
            <View
              style={{
                backgroundColor: 'white',
                marginLeft: 20,
                marginRight: 20,
                borderRadius: 10
              }}>
              <View style={styles.imageOptions}>
                <MaterialIcons name="camera-alt" size={72} color="gray" onPress={takeImageHandler} />
                <MaterialIcons name="photo-library" size={72} color="gray" onPress={takeGalleryHandler} />

              </View>
              <TouchableOpacity
                style={{ ...styles.button, marginRight: 10, marginLeft: 10, marginBottom: 10 }}
                onPress={() => setShowModal(false)}
                disabled={false}
              >
                <Button
                  style={{ marginTop: 10 }}
                  title={"Cancel"}
                  onPress={() => setShowModal(false)}
                />
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={formProps.handleSubmit as any}
            disabled={false}
            style={{ marginTop: 20}}
          >
            <Button
              style={{ marginTop: 20, backgroundColor: "#119DD8" }}
              title={formatMessage("Form.Save")}
              onPress={formProps.handleSubmit as any}
            />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "flex-start"
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    paddingHorizontal: 0,
    backgroundColor: "white",
    fontSize: 14
  },
  imageOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  button: {
    marginTop: 20
  }
});

export default ChildFormScreen;