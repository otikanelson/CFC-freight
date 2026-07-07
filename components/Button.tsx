import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'glass' | 'solid' | 'outline' | 'danger';
}

export default function Button({ 
  title, 
  variant = 'glass', 
  style, 
  ...props 
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    style
  ];

  const textStyle = [
    styles.baseText,
    styles[`${variant}Text` as keyof typeof styles]
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle}
      {...props}
    >
      <Text style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  solid: {
    backgroundColor: '#ffffff',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.3)',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  glassText: {
    color: '#ffffff',
  },
  solidText: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
  outlineText: {
    color: '#ffffff',
  },
  dangerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});