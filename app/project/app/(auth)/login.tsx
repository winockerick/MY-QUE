import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes } from '@/constants/theme';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ArrowLeft, Phone, Lock } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login, isLoading } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const [errors, setErrors] = useState({
    phone: '',
    otp: '',
  });
  
  const validatePhone = () => {
    let isValid = true;
    
    if (!phone.trim()) {
      setErrors(prev => ({ ...prev, phone: 'Namba ya simu inahitajika' }));
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      setErrors(prev => ({ ...prev, phone: 'Namba ya simu si sahihi' }));
      isValid = false;
    } else {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
    
    return isValid;
  };
  
  const validateOtp = () => {
    let isValid = true;
    
    if (!otp.trim()) {
      setErrors(prev => ({ ...prev, otp: 'Namba ya uthibitisho inahitajika' }));
      isValid = false;
    } else if (!/^\d{4}$/.test(otp.trim())) {
      setErrors(prev => ({ ...prev, otp: 'Namba ya uthibitisho si sahihi' }));
      isValid = false;
    } else {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
    
    return isValid;
  };
  
  const handleRequestOtp = async () => {
    if (!validatePhone()) return;
    
    // In a real app, you would make an API call to request an OTP here
    // For the demo, we'll just simulate it
    setIsOtpSent(true);
  };
  
  const handleLogin = async () => {
    if (!validateOtp()) return;
    
    try {
      await login(phone, otp);
    } catch (error) {
      console.error('Login error:', error);
      // Handle specific error messages here
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              title=""
              variant="text"
              onPress={() => router.back()}
              style={styles.backButton}
              textStyle={styles.backButtonText}
              rightIcon={<ArrowLeft size={24} color={Colors.neutral[800]} />}
            />
            <Text style={styles.title}>Mfumo wa Foleni</Text>
            <Text style={styles.subtitle}>Ingia kwenye akaunti yako</Text>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Namba ya Simu"
              placeholder="Mfano: 0712345678"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              error={errors.phone}
              editable={!isOtpSent}
              rightIcon={<Phone size={20} color={Colors.neutral[400]} />}
            />
            
            {isOtpSent && (
              <Input
                label="Namba ya Uthibitisho (OTP)"
                placeholder="Andika namba 4 za uthibitisho"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
                error={errors.otp}
                maxLength={4}
                rightIcon={<Lock size={20} color={Colors.neutral[400]} />}
              />
            )}
            
            {!isOtpSent ? (
              <Button
                title="Tuma Namba ya Uthibitisho"
                size="lg"
                fullWidth
                isLoading={isLoading}
                onPress={handleRequestOtp}
                style={styles.submitButton}
              />
            ) : (
              <Button
                title="Ingia"
                size="lg"
                fullWidth
                isLoading={isLoading}
                onPress={handleLogin}
                style={styles.submitButton}
              />
            )}
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>
                Huna akaunti?{' '}
              </Text>
              <Button
                title="Jiunge"
                variant="text"
                onPress={() => router.replace('/register')}
                textStyle={styles.registerButtonText}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  header: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
  },
  backButtonText: {
    color: Colors.neutral[800],
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xxxl,
    color: Colors.primary[600],
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.lg,
    color: Colors.neutral[700],
  },
  form: {
    marginTop: Spacing.lg,
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  registerText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
  },
  registerButtonText: {
    color: Colors.primary[600],
    fontFamily: FontFamily.medium,
  },
});