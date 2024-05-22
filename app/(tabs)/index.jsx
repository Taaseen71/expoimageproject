import {
  Image,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as ImagePicker from "expo-image-picker";
import PagerView from "react-native-pager-view";

export default function HomeScreen() {
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result?.canceled) {
        setImages((prevImages) => [...prevImages, result?.assets[0].uri]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Image Pick Error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, marginVertical: 20 }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Text>Images: {images.length}</Text>
      {images?.length > 0 && (
        <PagerView style={styles.container} initialPage={0}>
          {images.map((thisImage, index) => {
            console.log(index);
            return (
              <View style={styles.page} key={index}>
                <Image source={{ uri: thisImage }} style={styles.image} />
                {index === 0 && images.length > 1 ? (
                  <Text>Swipe ➡️</Text>
                ) : (
                  <></>
                )}
              </View>
            );
          })}
        </PagerView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%" },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  image: {
    width: 200,
    height: 200,
  },
});
