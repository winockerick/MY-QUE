import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';
import { Button } from '@/components/Button';
import { ArrowLeft, Clock, Users, Calendar, MapPin, CircleAlert as AlertCircle } from 'lucide-react-native';
import { useQueueStore } from '@/store/queueStore';

export default function ServiceCenterDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getServiceCenter, bookTicket } = useQueueStore();
  
  const center = getServiceCenter(id);
  const [isLoading, setIsLoading] = useState(false);
  const [notifyBeforeMinutes, setNotifyBeforeMinutes] = useState(10);
  
  if (!center) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Kituo hakikupatikana</Text>
        <Button
          title="Rudi Nyuma"
          onPress={() => router.back()}
          variant="outline"
        />
      </View>
    );
  }
  
  const handleBookTicket = async () => {
    setIsLoading(true);
    try {
      const ticket = await bookTicket(id, notifyBeforeMinutes);
      
      // Show confirmation
      if (Platform.OS === 'web') {
        alert(`Umewekwa kwenye foleni. Namba yako ni ${ticket.ticketNumber}`);
      } else {
        Alert.alert(
          'Nafasi Imewekwa',
          `Umewekwa kwenye foleni. Namba yako ni ${ticket.ticketNumber}`,
          [
            { text: 'Sawa', onPress: () => router.push('/my-spot') }
          ]
        );
      }
      router.push('/my-spot');
    } catch (error) {
      console.error('Failed to book ticket:', error);
      
      if (Platform.OS === 'web') {
        alert('Kumekuwa na hitilafu katika kuweka nafasi yako. Tafadhali jaribu tena.');
      } else {
        Alert.alert(
          'Hitilafu',
          'Kumekuwa na hitilafu katika kuweka nafasi yako. Tafadhali jaribu tena.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title=""
          variant="text"
          onPress={() => router.back()}
          style={styles.backButton}
          rightIcon={<ArrowLeft size={24} color={Colors.white} />}
        />
        <Text style={styles.headerTitle}>{center.name}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg' }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.locationContainer}>
          <MapPin size={18} color={Colors.primary[500]} />
          <Text style={styles.location}>{center.location}</Text>
        </View>
        
        <View style={styles.queueCard}>
          <Text style={styles.queueTitle}>Hali ya Foleni</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Users size={24} color={Colors.primary[500]} />
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{center.currentQueue}</Text>
                <Text style={styles.statLabel}>Waliopo Foleni</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statItem}>
              <Clock size={24} color={Colors.primary[500]} />
              <View style={styles.statTextContainer}>
                <Text style={styles.statValue}>{center.waitTime} dakika</Text>
                <Text style={styles.statLabel}>Muda wa Kusubiri</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.hoursCard}>
          <View style={styles.hoursHeader}>
            <Calendar size={20} color={Colors.primary[500]} />
            <Text style={styles.hoursTitle}>Saa za Kazi</Text>
          </View>
          <Text style={styles.hoursText}>{center.operatingHours}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <AlertCircle size={20} color={Colors.warning[500]} />
            <Text style={styles.infoTitle}>Maelezo ya Ziada</Text>
          </View>
          <Text style={styles.infoText}>
            Unaweza kuweka nafasi yako kwenye foleni sasa. Utaarifiwa dakika {notifyBeforeMinutes} kabla ya zamu yako.
          </Text>
        </View>
        
        <View style={styles.bookingSection}>
          <Text style={styles.bookingTitle}>Weka Nafasi Kwenye Foleni</Text>
          
          <Button
            title="Weka Nafasi"
            size="lg"
            fullWidth
            isLoading={isLoading}
            onPress={handleBookTicket}
            style={styles.bookButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    backgroundColor: Colors.primary[600],
    padding: Spacing.lg,
    paddingTop: Spacing.xxxl,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: Spacing.sm,
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xl,
    color: Colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  location: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
    marginLeft: Spacing.sm,
  },
  queueCard: {
    backgroundColor: Colors.white,
    margin: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  queueTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[900],
    marginBottom: Spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
    marginHorizontal: Spacing.md,
  },
  statTextContainer: {
    marginLeft: Spacing.md,
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[900],
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.sm,
    color: Colors.neutral[500],
  },
  hoursCard: {
    backgroundColor: Colors.white,
    margin: Spacing.lg,
    marginTop: 0,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  hoursTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
    marginLeft: Spacing.sm,
  },
  hoursText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
  },
  infoCard: {
    backgroundColor: Colors.warning[50],
    margin: Spacing.lg,
    marginTop: 0,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  infoTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
    marginLeft: Spacing.sm,
  },
  infoText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[700],
    lineHeight: 22,
  },
  bookingSection: {
    margin: Spacing.lg,
    marginTop: 0,
    marginBottom: Spacing.xxl,
  },
  bookingTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[900],
    marginBottom: Spacing.lg,
  },
  bookButton: {
    backgroundColor: Colors.primary[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  errorText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.lg,
    color: Colors.neutral[700],
    marginBottom: Spacing.lg,
  },
});