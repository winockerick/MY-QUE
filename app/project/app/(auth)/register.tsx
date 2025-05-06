import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes } from '@/constants/theme';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ArrowLeft, User, Phone, Mail } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Jina linahitajika';
      isValid = false;
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Namba ya simu inahitajika';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = 'Namba ya simu si sahihi';
      isValid = false;
    }
    
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Barua pepe si sahihi';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      await register(name, phone, email || undefined);
    } catch (error) {
      console.error('Registration error:', error);
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
            <Text style={styles.subtitle}>Jiunge na sisi</Text>
          </View>
          
          <View style={styles.form}>
            <Input
              label="Jina Kamili"
              placeholder="Andika jina lako kamili"
              value={name}
              onChangeText={setName}
              error={errors.name}
              rightIcon={<User size={20} color={Colors.neutral[400]} />}
            />
            
            <Input
              label="Namba ya Simu"
              placeholder="Mfano: 0712345678"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              error={errors.phone}
              rightIcon={<Phone size={20} color={Colors.neutral[400]} />}
            />
            
            <Input
              label="Barua Pepe (Si lazima)"
              placeholder="mfano@barua.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              rightIcon={<Mail size={20} color={Colors.neutral[400]} />}
            />
            
            <Button
              title="Jiunge"
              size="lg"
              fullWidth
              isLoading={isLoading}
              onPress={handleSubmit}
              style={styles.submitButton}
            />
            
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Una akaunti tayari?{' '}
              </Text>
              <Button
                title="Ingia"
                variant="text"
                onPress={() => router.replace('/login')}
                textStyle={styles.loginButtonText}
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  loginText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
  },
  loginButtonText: {
    color: Colors.primary[600],
    fontFamily: FontFamily.medium,
  },
});