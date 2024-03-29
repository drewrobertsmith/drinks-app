import { Slot, Stack } from "expo-router";

import { Button } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function AppLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Drinks",
          }}
        />
        <Stack.Screen
          name="[drinkPage]"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
