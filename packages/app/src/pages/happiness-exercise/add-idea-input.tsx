import colors from "colors";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { IconSvg } from "components/icon";
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const ADD_IDEA_HEIGHT = 120;

type AddIdeaInputProps = {
  onPress: (text: string) => void;
  toggleShowFooter: () => void;
};

export function AddIdeaInput({ onPress, toggleShowFooter }: AddIdeaInputProps) {
  const { t } = useTranslation();
  const [idea, setIdea] = useState("");
  const disabled = idea.length < 2;

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  });

  const _keyboardDidShow = () => {
    toggleShowFooter();
  };

  const _keyboardDidHide = () => {
    toggleShowFooter();
  };

  return (
    <View style={AddIdeaInputStyles.container}>
      <TextInput
        multiline
        numberOfLines={3}
        maxLength={200}
        style={AddIdeaInputStyles.input}
        returnKeyType="done"
        onChangeText={(text) => setIdea(text)}
        placeholder={t("happiness.exercise.ideaPlaceholder")}
        placeholderTextColor="white"
        value={idea}
      />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          onPress(idea);
          setIdea("");
        }}
        style={AddIdeaInputStyles.iconContainer}
      >
        <IconSvg
          name="tickFill"
          size={24}
          color={disabled ? colors.primaryThird : colors.backgroundPrimaryThird}
          style={AddIdeaInputStyles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const AddIdeaInputStyles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    marginHorizontal: 32,
    height: ADD_IDEA_HEIGHT,
  },
  input: {
    flex: 1,
    borderWidth: 5,
    borderColor: "white",
    paddingHorizontal: 16,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    fontFamily: "IRANYekanRDMobile",
    fontSize: 18,
    color: "white",
    textAlign: "right",
    elevation: 4,
  },
  iconContainer: { position: "absolute", right: 15, top: 15 },
  icon: {
    elevation: 8,
    borderRadius: 24,
    backgroundColor: colors.backgroundPrimary,
  },
});
