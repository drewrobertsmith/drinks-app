import { SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import Auth from "../components/auth";
import DrinksFeed from "../components/drinksFeed";
import { StatusBar } from "expo-status-bar";
import { supabase } from "../supabase/supabase";

//DATABASE_KEY = "CffV7FoGg0X5j0Ts";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
    return <DrinksFeed />;
  } else if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <Auth />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drinkCard: {
    margin: 4,
    padding: 8,
  },
});
