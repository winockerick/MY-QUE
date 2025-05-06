import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from 'react-native';
import { Colors, FontFamily, BorderRadius, Spacing, FontSizes } from '@/constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export function Input({ 
  label,
  error,
  containerStyle,
  rightIcon,
  isPassword = false,
  ...props 
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const getBorderColor = () => {
    if (error) return Colors.error[500];
    if (isFocused) return Colors.primary[500];
    return Colors.neutral[300];
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        { borderColor: getBorderColor() }
      ]}>
        <TextInput
          style={styles.input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={Colors.neutral[400]}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        
        {isPassword ? (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            {showPassword ? 
              <EyeOff size={20} color={Colors.neutral[500]} /> : 
              <Eye size={20} color={Colors.neutral[500]} />
            }
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        ) : null}
      </View>
      
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.sm,
    color: Colors.neutral[700],
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
  },
  iconContainer: {
    paddingLeft: Spacing.sm,
  },
  error: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.error[500],
    marginTop: Spacing.xs,
  },
});