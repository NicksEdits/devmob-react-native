import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Global from "./Global";

interface AnimatedFloatingButtonProps {
  onPress?: () => void;
  position?:
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

const AnimatedFloatingBtn: React.FC<AnimatedFloatingButtonProps> = ({
  onPress,
  position = "bottom-right",
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const right = position.includes("right") ? 12 : undefined;
  const left = position.includes("left") ? 12 : undefined;
  const top = position.includes("top") ? 12 : undefined;
  const bottom = position.includes("bottom") ? 12 : undefined;

  const styles = StyleSheet.create({
    buttonContainer: {
      position: "absolute",
      bottom,
      right,
      left,
      top,
      alignItems: "center",
      justifyContent: "center",
    },
    pulseCircle: {
      position: "absolute",
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "rgba(0, 175, 185, 0.2)",
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#00afb9",
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      shadowColor: "#00afb9",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  return (
    <View style={[styles.buttonContainer]}>
      {onPress && (
        <Animated.View
          style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]}
        />
      )}
      <Global buttonStyle={styles.button} onPress={onPress}>
        <Ionicons style={{position:"absolute"}} name="add" size={40} color="white" />
      </Global>
    </View>
  );
};

export default AnimatedFloatingBtn;
