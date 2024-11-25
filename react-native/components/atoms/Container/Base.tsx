import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BaseProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Base: React.FC<BaseProps> = ({ children, style }) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {

        padding: 10,
        alignItems: 'center',
    },
});

export default Base;