import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  async function handleSubmit() {
    if (!form.email || !form.password)
      return Alert.alert(
        "Error",
        "Please enter vaild email address and pssword"
      );
    setIsSubmitting(true);
    try {
      Alert.alert("Success", "User signed in successfully.");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text: string) => setForm((i) => ({ ...i, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your Password  "
        value={form.password}
        onChangeText={(text: string) =>
          setForm((i) => ({ ...i, password: text }))
        }
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        isLoading={isSubmitting}
        onPress={handleSubmit}
        title="Sign In"
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don&apos;t have an account?
        </Text>
        <Link href={"/SignUp"} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
}
