import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated, View, Pressable } from "react-native";
import { Icon } from "@/components/atoms";

interface AnimatedFloatingButtonProps {
  onPress?: () => void;
  position?:
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  children: React.ReactNode;
}

const AnimatedFloatingBtn: React.FC<AnimatedFloatingButtonProps> = ({
  onPress,
  position = "bottom-right",
  children,
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
      backgroundColor: "#1cb98f", // Couleur verte pour l e bouton
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
      shadowColor: "#80dbe5",
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
      <Pressable style={styles.button} onPress={onPress}>
        {children}
      </Pressable>
    </View>
  );
};

export default AnimatedFloatingBtn;
