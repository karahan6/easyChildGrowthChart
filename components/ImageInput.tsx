import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Button } from "react-native-elements";
import { Camera } from "expo-camera";

import * as ImgPicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import useCameraPermissions from "../hooks/useCameraPermissions";

interface ImageInputProps {
    uri: string | null;
    setUri: Function;
}
export function ImageInput(props: ImageInputProps) {
    const [showModal, setShowModal] = useState(false);
    const [cameraState, fetchCameraPermissionAPI] = useCameraPermissions();

    const attachImage = async (uri: string) => {
        const fileName = uri.split("/").pop() ?? "";
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: uri,
                to: newPath
            });
            props.setUri(newPath);
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
        setShowModal(false);
        const image = await ImgPicker.launchImageLibraryAsync({
            aspect: [16, 9],
            quality: 0.5
        });
        
        if (!image.cancelled) {
            await attachImage(image.uri);
        }
        
    };

    return (<View style={{ justifyContent: "center", alignItems: "center" }}>
        {props.uri ? <TouchableOpacity onPress={() => setShowModal(true)}>
            <Avatar.Image source={{ uri: props.uri }} style={{ marginTop: 10 }} />
        </TouchableOpacity> : <AntDesign
                name="plussquareo"
                size={60}
                style={{ marginTop: 10 }}
                color="gray"
                onPress={() => setShowModal(true)} />}
        <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#00000080'
                }}>
                <View style={styles.imageOptions}>
                    <Text style={{ color: 'blue', fontSize:18, marginBottom:10 }}
                        onPress={takeImageHandler}>
                        Take an image
                    </Text>
                    <Text style={{ color: 'blue', fontSize: 18 }}
                        onPress={takeGalleryHandler}>
                        Take an image from gallery
                    </Text>
                    <TouchableOpacity
                    style={{marginTop: 15}}
                    onPress={() => setShowModal(false)}
                    disabled={false}
                >
                    <Button
                        title={"Cancel"}
                        onPress={() => setShowModal(false)}
                    />
                </TouchableOpacity>
                </View>
                
            </View>
        </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
    imageOptions: {
        backgroundColor: "white",
        width:300,
        padding:10,
        
    },
    button: {
        marginTop: 20
    }
});