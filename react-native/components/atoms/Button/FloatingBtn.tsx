import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View } from 'react-native';

interface AnimatedFloatingButtonProps {
  onPress: () => void;
}

const AnimatedFloatingBtn: React.FC<AnimatedFloatingButtonProps> = ({ onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.1, duration: 600, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  return (
    <View style={styles.buttonContainer}>
      <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.plus}>
          <View style={styles.plusHorizontal} />
          <View style={styles.plusVertical} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 175, 185, 0.2)',


  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00afb9',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#00afb9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  plus: {
    width: 20,
    height: 20,
  },
  plusHorizontal: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 20,
    height: 2,
    backgroundColor: 'white',
  },
  plusVertical: {
    position: 'absolute',
    top: 0,
    left: 9,
    width: 2,
    height: 20,
    backgroundColor: 'white',
  },
});

export default AnimatedFloatingBtn;