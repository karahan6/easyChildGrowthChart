import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import useChild from '../../hooks/useChild';
import { ImageInput } from '../../components/ImageInput';


type ChildFormScreenNavigationProp = StackNavigationProp<ChildrenParamList, 'ChildFormScreen'>;
type ChildFormScreenRouteProp = RouteProp<ChildrenParamList, 'ChildFormScreen'>;

type ChildFormScreenProps = {
  navigation: ChildFormScreenNavigationProp;
  route: ChildFormScreenRouteProp
};

let childFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Child.Form.Name.HelperText"),
  birthDay: Yup.string()
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

let dummyValues: IChildForm = {
  name: undefined,
  birthDay: new Date(),
  note: undefined,
  gender: Gender.Girl
}


const ChildFormScreen = ({ navigation, route }: ChildFormScreenProps) => {
  const [initialValues, setInitialValues] = useState(dummyValues);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const nameRef = useRef<any>(null);

  let child = useChild(route.params.id);

  useEffect(() => {
    if (child != null) {
      setInitialValues({ ...child, birthDay: new Date(child.birthDay) });
      setImageUri(child.photo);
    }
    else {
      setInitialValues(dummyValues);
      setImageUri("");
    }
  }, [child])
  const saveChild = useStoreActions(actions => actions.child.saveChild);


  navigation.setOptions({ title: route.params.id == 0 ? "Add Child" : "Edit Child" });

  const handleSubmit = (values: any) => {
    saveChild({ ...values, isSent: false, photo: imageUri });
    navigationService.navigate("ChildrenScreen", {});
  }
  //set initial values depend on id in useeffect

  const onDateChange = (event: Event, selectedDate: Date | undefined, formProps: FormikProps<IChildForm>) => {
    //TODO check in IOS
    setShowDatePicker(Platform.OS === 'ios');
    formProps.setFieldValue("birthDay", selectedDate);
    if (nameRef && nameRef.current != null)
      nameRef.current.focus();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={childFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {formProps => (
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Text>Photo</Text>
            <ImageInput uri={imageUri} setUri={setImageUri} />
          </View>
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
          <TouchableOpacity
            onPress={formProps.handleSubmit as any}
            disabled={false}
            style={{ marginTop: 20 }}
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