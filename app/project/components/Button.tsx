import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Colors, FontFamily, BorderRadius, Spacing } from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(({ 
  title, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  fullWidth = false,
  style,
  textStyle,
  disabled,
  ...props 
}, ref) => {
  
  const getContainerStyle = () => {
    const baseStyle: StyleProp<ViewStyle> = [
      styles.base,
      styles[`${size}Container`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
    ];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, styles.primaryContainer];
      case 'secondary':
        return [...baseStyle, styles.secondaryContainer];
      case 'outline':
        return [...baseStyle, styles.outlineContainer];
      case 'text':
        return [...baseStyle, styles.textContainer];
      default:
        return [...baseStyle, styles.primaryContainer];
    }
  };
  
  const getTextStyle = () => {
    const baseTextStyle: StyleProp<TextStyle> = [
      styles.text,
      styles[`${size}Text`],
      disabled && styles.disabledText,
    ];
    
    switch (variant) {
      case 'primary':
        return [...baseTextStyle, styles.primaryText];
      case 'secondary':
        return [...baseTextStyle, styles.secondaryText];
      case 'outline':
        return [...baseTextStyle, styles.outlineText];
      case 'text':
        return [...baseTextStyle, styles.textOnlyText];
      default:
        return [...baseTextStyle, styles.primaryText];
    }
  };
  
  return (
    <TouchableOpacity
      ref={ref}
      style={[getContainerStyle(), style]}
      disabled={isLoading || disabled}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'text' ? Colors.primary[600] : Colors.white}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.md,
  },
  fullWidth: {
    width: '100%',
  },
  smContainer: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  mdContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  lgContainer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 56,
  },
  
  // Container Variants
  primaryContainer: {
    backgroundColor: Colors.primary[600],
  },
  secondaryContainer: {
    backgroundColor: Colors.secondary[600],
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  textContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  
  // Text Base
  text: {
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  
  // Text Variants
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary[600],
  },
  textOnlyText: {
    color: Colors.primary[600],
  },
  
  // Disabled
  disabled: {
    backgroundColor: Colors.neutral[300],
    borderColor: Colors.neutral[300],
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.neutral[600],
  },
});