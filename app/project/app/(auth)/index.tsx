import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes } from '@/constants/theme';
import { Button } from '@/components/Button';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mfumo wa Foleni</Text>
        <Text style={styles.subtitle}>
          Njia rahisi ya kupanga foleni bila usumbufu
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.featureList}>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Pata huduma bila kusubiri muda mrefu</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Weka nafasi yako kwa urahisi</Text>
        </View>
        <View style={styles.featureItem}>
          <View style={styles.featureDot} />
          <Text style={styles.featureText}>Pokea arifa zamu yako inapokaribia</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <Button title="Ingia" size="lg" fullWidth style={styles.loginButton} />
        </Link>
        
        <Link href="/register" asChild>
          <Button 
            title="Jiunge" 
            variant="outline" 
            size="lg" 
            fullWidth 
            style={styles.registerButton}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: Spacing.xxxl,
    marginBottom: Spacing.xl,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.display,
    color: Colors.primary[600],
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
  imageContainer: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featureList: {
    marginBottom: Spacing.xxxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
    marginRight: Spacing.sm,
  },
  featureText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
  },
  buttonContainer: {
    marginTop: 'auto',
    gap: Spacing.md,
  },
  loginButton: {
    backgroundColor: Colors.primary[600],
  },
  registerButton: {
    borderColor: Colors.primary[600],
  },
});