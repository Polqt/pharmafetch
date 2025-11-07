import { useRouter } from "expo-router";
import { Button, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <SafeAreaView>
      <View className="flex justify-center">
        <Image
          source={require("../assets/images/doctor.png")}
          className="flex items-center mt-16"
          width={200}
          height={200}
          alt="Doctor"
        />
        <Text className="font-bold text-xl text-center mt-8">
          Medicines delivered {"\n"} with care...
        </Text>
        <View className="mt-12 flex justify-center items-center">
          <Button title="Get Started" onPress={handleGetStarted} />
        </View>
      </View>
    </SafeAreaView>
  );
}
