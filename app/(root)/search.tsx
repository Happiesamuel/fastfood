import seed from "@/lib/seed";
import React from "react";
import { Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function search() {
  return (
    <SafeAreaView>
      <Button
        title="Seed"
        onPress={() => seed().catch((e) => console.log(e, "failed to seed"))}
      />
    </SafeAreaView>
  );
}
