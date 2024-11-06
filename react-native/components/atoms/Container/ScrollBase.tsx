import React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native'
import ScrollView = Animated.ScrollView

interface BaseProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Base: React.FC<BaseProps> = ({ children, style }) => {
    return <ScrollView >{children}</ScrollView>;
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Base;