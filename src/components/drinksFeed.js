import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { Card } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { supabase } from "../supabase/supabase";

const DRINKSDATA = [
  {
    id: 1,
    name: "Old Fashion",
    base_spirit: "Whiskey",
    mother_drink: "Old Fashioned",
    ingredients: ["2oz whiskey", ".25oz demerara", "3 dash angostura"],
    directions: {
      Step_1: "Do this first",
      Step_2: "Do this second",
    },
  },
  {
    id: 2,
    name: "Martini",
    base_spirit: "Gin",
    mother_drink: "Martini",
    ingredients: [
      "2oz Gin",
      ".25oz Blanc Vermouth",
      ".25oz Dry Vermouth",
      "1 dash orange",
    ],
    directions: {
      Step_1: "Do this first",
      Step_2: "Do this second",
    },
  },
];

export default function DrinksFeed() {
  const [drinks, setDrinks] = useState([]);
  console.log(drinks);

  useEffect(() => {
    getDrinks();
  }, []);

  async function getDrinks() {
    const { data } = await supabase.from("drinks").select();
    setDrinks(data);
  }

  const DrinkItem = ({ item }) => {
    return (
      <Card
        onPress={() => {
          router.navigate("/[drinkPage]");
        }}
        style={styles.drinkCard}
      >
        <Card.Title title={item.name} />
        <Card.Content>
          {/* {item.ingredients_list.map((i) => (
            <Text>{i.spirit}</Text>
          ))} */}
          <Text>Ingredients</Text>
          <Text>{item.ingredients_list?.spirit}</Text>
          <Text>{item.ingredients_list?.modifiers}</Text>
          <Text>{item.ingredients_list?.sweetner}</Text>
          <Text>{item.ingredients_list?.garnish}</Text>
        </Card.Content>
        <Card.Actions>
          <Text>{item.base_spirit}</Text>
          <Text>{item.mother_drink}</Text>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MasonryFlashList
        data={drinks}
        numColumns={2}
        estimatedItemSize={5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DrinkItem item={item} />}
      />
      <Button
        title="Log Out"
        onPress={() => {
          const { error } = supabase.auth.signOut();
        }}
      />
    </View>
  );
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
