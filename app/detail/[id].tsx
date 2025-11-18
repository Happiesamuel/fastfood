import CustomHeader from "@/components/CustomHeader";
import { images, sides, toppings } from "@/constants";
import { getMenuById } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data, loading } = useAppwrite({
    fn: getMenuById,
    params: { id: params.id },
  });
  if (loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  console.log(data);
  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-5 pb-10"
      >
        <CustomHeader />
        <View className="flex flex-row justify-between items-center font-quicksand-semibold">
          <View className="flex gap-5">
            <Text className="text-2xl font-bold text-dark-100">
              {data?.name}
            </Text>
            <Text className="font-medium text-base text-gray-200">
              Cheeseburger
            </Text>
            <View className="flex flex-row gap-2 items-center">
              <View className="flex flex-row gap-1 items-center">
                {Array.from({ length: Math.ceil(data!.rating) }).map((x, i) => (
                  <Image
                    key={i}
                    source={images.star}
                    className="size-5"
                    resizeMode="contain"
                  />
                ))}
              </View>
              <Text className="text-gray-200 font-semibold text-base">
                {data?.rating}/5
              </Text>
            </View>
            <Text className="font-bold text-2xl text-dark-100">
              <Text className="text-primary">$</Text>
              {data?.price}
            </Text>
            <View className="flex flex-row items-center gap-4">
              <MealType name="Calories" value="365 Cal" />
              <MealType name="Protein" value="35g" />
            </View>
            <MealType name="Bun Type" value="Whole Wheat" />
          </View>
          <Image
            source={{ uri: data?.image_url }}
            className="w-full "
            style={{ height: Dimensions.get("screen").height / 3 }}
            resizeMode="contain"
          />
        </View>
        <View className="bg-primary/5 px-3 py-4 mt-5 rounded-full flex flex-row items-center justify-between">
          <MealTitle icon={images.dollar} title="Free Delivery" />
          <MealTitle icon={images.clock} title="20 - 30 mins" />
          <MealTitle icon={images.star} title={data!.rating.toString()} />
        </View>
        <Text className="text-gray-200 font-medium text-base my-5">
          The Cheeseburger Wendy&apos;s Burger is a classic fast food burger
          that packs a punch of flavor in every bite. Made with a juicy beef
          patty cooked to perfection, it&apos;s topped with melted American
          cheese, crispy lettuce, tomato, & crunchy pickles.
        </Text>
        <View>
          <View className="gap-4">
            <View>
              <Text className="font-bold text-dark-100 text-base mb-2">
                Toppings
              </Text>
              <FlatList
                renderItem={({ item }) => (
                  <ListContent name={item.name} image={item.image} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-x-6 pb-3 "
                data={toppings}
                keyExtractor={(item) => item.name}
                horizontal
              />
            </View>
            <View>
              <Text className="font-bold text-dark-100 text-base mb-2">
                Slide options
              </Text>
              <FlatList
                renderItem={({ item }) => (
                  <ListContent name={item.name} image={item.image} />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-x-6 pb-3 "
                data={sides}
                keyExtractor={(item) => item.name}
                horizontal
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={
          Platform.OS === "android"
            ? { elevation: 10, shadowColor: "#878787" }
            : {}
        }
        className="flex mb-6 justify-between flex-row items-center rounded-2xl py-3.5 bg-white px-6 w-[90%] mx-auto"
      >
        <View className="flex flex-row gap-5 items-center justify-between">
          <Image
            source={images.minus}
            className="size-5"
            resizeMode="contain"
          />
          <Text className="text-dark-100 font-bold text-xl">2</Text>
          <Image source={images.plus} className="size-5" resizeMode="contain" />
        </View>
        <TouchableOpacity className="bg-primary text-white py-3.5 px-6 rounded-full flex flex-row items-center gap-2">
          <Image source={images.bag} className="size-5" resizeMode="contain" />
          <Text className="text-white font-bold text-sm">
            Add to cart (${data?.price})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function MealType({ name, value }: { name: string; value: string }) {
  return (
    <View className="flex flex-col gap-1">
      <Text className="text-gray-200 font-medium text-sm">{name}</Text>
      <Text className="text-dark-100 font-semibold text-base">{value}</Text>
    </View>
  );
}
function MealTitle({ icon, title }: { icon: any; title: string }) {
  return (
    <View className="flex flex-row gap-2">
      <Image source={icon} className="size-5" resizeMode="contain" />
      <Text className="text-dark-100 font-semibold text-base">{title}</Text>
    </View>
  );
}
function ListContent({ image, name }: { image: any; name: string }) {
  return (
    <View
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
      className="rounded-2xl bg-[#3C2F2F] w-[80px]"
    >
      <View className="bg-white flex items-center justify-center flex-row w-full h-16 rounded-b-2xl">
        <Image source={image} className="size-[90%]" resizeMode="contain" />
      </View>

      <View className="flex flex-row items-center justify-between px-2 py-3">
        <Text className="text-white text-xs font-semibold">{name}</Text>
        <View className="size-4 bg-red-500 pb-1.5 flex flex-col items-center justify-center rounded-full">
          <Text className="text-white text-xs">+</Text>
        </View>
      </View>
    </View>
  );
}
