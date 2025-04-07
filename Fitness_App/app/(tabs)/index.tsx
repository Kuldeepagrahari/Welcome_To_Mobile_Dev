import {ScrollView, Image, Text, View} from "react-native";
import {Link} from "expo-router"
import { images } from "@/constants/images"
import { icons } from "@/constants/icons";
import SearchBar from "../components/searchBar";
export default function Index() {
  return (

    <View className="flex-1 bg-primary">
       <Image source={images.bg} className="w-full absolute z-0" />
       <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
       contentContainerStyle={{minHeight:"100%", paddingBottom: 10}}
       >
        <Image className="mx-auto mt-10 mb-5 w-12 h-10" source={icons.logo}></Image>
        <SearchBar></SearchBar>
       </ScrollView>
    </View>
  );
}
