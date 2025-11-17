import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
export default function SearchBar() {
  const searchParams = useLocalSearchParams<{ query: string }>();
  const [query, setQuery] = useState(searchParams.query || "");
  //   const debouncedSearch = useDebouncedCallback(
  //     (text: string) => router.push(`/search?query=${text}`),
  //     // (text: string) => router.setParams({ query: text }),
  //     500
  //   );
  function handleChangeText(text: string) {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
    // debouncedSearch(text);
  }
  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers ..."
        value={query}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        placeholderTextColor={"#a0a0a0"}
      />
      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query })}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor={"#5d5f6d"}
        />
      </TouchableOpacity>
    </View>
  );
}
