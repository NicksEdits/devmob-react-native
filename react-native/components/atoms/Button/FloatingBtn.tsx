import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, View, Modal } from 'react-native';
import { Container } from '@/components/atoms';

interface AnimatedFloatingButtonProps {
  onSubmit: (data: { label: string; username: string; description: string; distance: string }) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  initialData?: { label: string; username: string; description: string; distance: string };
  onAddPress?: () => void;
}

const AnimatedFloatingBtn: React.FC<AnimatedFloatingButtonProps> = ({ 
  onSubmit, 
  isVisible, 
  setIsVisible, 
  initialData,
  onAddPress 
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.1, duration: 600, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]);

    Animated.loop(pulse).start();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.buttonContainer}>
      {onAddPress && (<Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} /> )}
      {onAddPress && (
        <TouchableOpacity style={styles.button} onPress={onAddPress}>
          <View style={styles.plus}>
            <View style={styles.plusHorizontal} />
            <View style={styles.plusVertical} />
          </View>
        </TouchableOpacity>
      )}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <Container.PropositionForm onSubmit={onSubmit} onClose={handleClose} initialData={initialData} />
        </View>
      </Modal>
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

export default AnimatedFloatingBtn;