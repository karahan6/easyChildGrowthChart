import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View,ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import {Drawer} from 'antd-mobile';
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
import { IMeasurement } from '../../models/IMeasurement';


type MeasurementFormScreenNavigationProp = StackNavigationProp<ChildrenParamList, 'MeasurementFormScreen'>;
type MeasurementFormScreenRouteProp = RouteProp<ChildrenParamList, 'MeasurementFormScreen'>;

type MeasurementFormScreenProps = {
  navigation: MeasurementFormScreenNavigationProp;
  route: MeasurementFormScreenRouteProp
};

let MeasurementFormSchema = Yup.object().shape({
  date: Yup.string()
    .required("Measurement.Form.Date.HelperText"),
  weight: Yup.string()
    .required("Measurement.Form.Weight.HelperText"),
  height: Yup.string()
    .required("Measurement.Form.Height.HelperText"),
  head: Yup.string()
    .required("Measurement.Form.Head.HelperText"),
});

interface IMeasurementForm {
  date: Date,
  weight: string | undefined,
  height: string | undefined,
  head: string | undefined,
  note: string | undefined
}
const inputTheme = {
  colors: {
    primary: "#119DD8"
  }
};

let dummyValues: IMeasurementForm = {
  date: new Date(),
  weight: undefined,
  height: undefined,
  head: undefined,
  note: undefined
}

const MeasurementFormScreen = ({ navigation, route }: MeasurementFormScreenProps) => {
  const [initialValues, setInitialValues] = useState(dummyValues);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const weightRef = useRef<any>(null);
  const saveMeasurement = useStoreActions(actions => actions.measurement.saveMeasurement);
  
  const getMeasurement = useStoreActions(actions => actions.measurement.getMeasurement);
  const measurement = useStoreState(state => state.measurement.measurement);

  useEffect(()=>{
    let id = route.params.id;
      if (id != 0)
          getMeasurement(id);
  },[])
  useEffect(() => {
    if (measurement != null) {
      setInitialValues({
        date: new Date(measurement.date),
        weight: measurement.weight.toString(),
        height: measurement.height.toString(),
        head: measurement.head.toString(),
        note: measurement.note
      });
    }
    else {
      setInitialValues(dummyValues);
    }
  }, [measurement])
  
  navigation.setOptions({ title: route.params.id == 0 ? "Add Measurement" : "Edit Measurement" });

  const handleSubmit = (values: IMeasurementForm) => {
    let childId = route.params.childId;
    let measurementId = route.params.id ?? undefined;
    let measurement: IMeasurement = {
      id: measurementId,
      childId: childId,
      date: values.date.toDateString(),
      weight: Number(values.weight),
      height: Number(values.height),
      head: Number(values.head),
      note: values.note,
      isSent: false,
    };
    saveMeasurement(measurement);
    navigationService.navigate("ChildDetailScreen", {id: route.params.childId});
  }

  const onDateChange = (event: Event, selectedDate: Date | undefined, formProps: FormikProps<IMeasurementForm>) => {
    const currentDate = selectedDate || initialValues.date;
    //TODO check in IOS
    // if(Platform.OS === 'ios')
    //   setShowDatePicker(false);
    setShowDatePicker(Platform.OS === 'ios');
    if (weightRef && weightRef.current != null)
      weightRef.current.focus();
    formProps.setFieldValue("date", currentDate);
  };

  const onNumberChange = ( str: string, formProps: FormikProps<IMeasurementForm>, field: string ) => {
    formProps.setFieldValue(field, str.replace(/,/g, '').replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) { 
        return b + c.replace( /\./g, '' );
    }));
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={MeasurementFormSchema}
      onSubmit={handleSubmit}
    >
      {formProps => (
        <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="never" 
        >
          <TextInput
            label={formatMessage("Measurement.Form.Date")}
            value={formProps.values.date.toLocaleDateString()}
            onFocus={(e: any) => setShowDatePicker(true)}
            style={styles.text}
          
            error={
              formProps.touched.date &&
              formProps.submitCount > 0 &&
              formProps.errors.date != null
            }
            theme={inputTheme}
          />
          {formProps.touched.date &&
            formProps.submitCount > 0 &&
            formProps.errors.date != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.date ? formatMessage("Measurement.Form.Date.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}
          {showDatePicker && 
          // <Drawer open= {showDatePicker}
          // enableDragHandle
          // contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          // >
          <DateTimePicker
            mode="date"
            is24Hour={false}
            
            value={formProps.values.date}
            onChange={(e, selectedDate) => onDateChange(e, selectedDate, formProps)}
          />
           //</Drawer>

          }
          <TextInput
            ref={weightRef}
            label={formatMessage("Measurement.Form.Weight")}
            value={formProps.values.weight}
            returnKeyType='done'
             keyboardType='decimal-pad'
            onChangeText={(str) => onNumberChange(str, formProps, "weight")}
            style={styles.text}
            error={
              formProps.touched.weight &&
              formProps.submitCount > 0 &&
              formProps.errors.weight != null
            }
            theme={inputTheme}
          />
          {formProps.touched.weight &&
            formProps.submitCount > 0 &&
            formProps.errors.weight != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.weight ? formatMessage("Measurement.Form.Weight.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}
          
          <TextInput
            label={formatMessage("Measurement.Form.Height")}
            value={formProps.values.height}
            returnKeyType='done'

             keyboardType='decimal-pad'
            onChangeText={(str) => onNumberChange(str, formProps, "height")}
            style={styles.text}
            error={
              formProps.touched.height &&
              formProps.submitCount > 0 &&
              formProps.errors.height != null
            }
            theme={inputTheme}
          />
          {formProps.touched.height &&
            formProps.submitCount > 0 &&
            formProps.errors.height != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.height ? formatMessage("Measurement.Form.Height.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}
          
          <TextInput
            label={formatMessage("Measurement.Form.Head")}
            value={formProps.values.head}
            returnKeyType='done'

             keyboardType='decimal-pad'
            onChangeText={(str) => onNumberChange(str, formProps, "head")}
            style={styles.text}
            error={
              formProps.touched.head &&
              formProps.submitCount > 0 &&
              formProps.errors.head != null
            }
            theme={inputTheme}
          />
          {formProps.touched.head &&
            formProps.submitCount > 0 &&
            formProps.errors.head != null ? (
              <HelperText type="error" style={{ paddingHorizontal: 0 }}>
                {formProps.errors.head ? formatMessage("Measurement.Form.Head.HelperText") : ""}
              </HelperText>
            ) : (
              null
            )}
          
          <TextInput
            label={formatMessage("Measurement.Form.Note")}
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
          </ScrollView>
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

export default MeasurementFormScreen;