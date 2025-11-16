import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  async function handleSubmit() {
    if (!form.email || !form.password || !form.name)
      return Alert.alert(
        "Error",
        "Please enter vaild email address and pssword"
      );
    setIsSubmitting(true);
    try {
      await createUser({
        email: form.email,
        password: form.password,
        name: form.name,
      });
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
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text: string) => setForm((i) => ({ ...i, name: text }))}
        label="Full name"
      />
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
        onPress={handleSubmit}
        title="Sign In"
        isLoading={isSubmitting}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href={"/SignIn"} className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}
