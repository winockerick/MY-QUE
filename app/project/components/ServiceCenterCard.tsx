import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Users } from 'lucide-react-native';
import { Colors, FontFamily, BorderRadius, Spacing, FontSizes, Shadows } from '@/constants/theme';

interface ServiceCenterCardProps {
  id: string;
  name: string;
  location: string;
  currentQueue: number;
  waitTime: number;
  operatingHours: string;
  onPress: (id: string) => void;
}

export function ServiceCenterCard({
  id,
  name,
  location,
  currentQueue,
  waitTime,
  operatingHours,
  onPress,
}: ServiceCenterCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Users size={18} color={Colors.primary[500]} />
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>{currentQueue}</Text>
            <Text style={styles.statLabel}>Waliopo Foleni</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Clock size={18} color={Colors.primary[500]} />
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>{waitTime} dakika</Text>
            <Text style={styles.statLabel}>Muda wa Kusubiri</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.hours}>Saa za Kazi: {operatingHours}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  headerContainer: {
    marginBottom: Spacing.sm,
  },
  name: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.sm,
    color: Colors.neutral[600],
    marginLeft: Spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.sm,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: Colors.neutral[200],
    marginHorizontal: Spacing.sm,
  },
  statTextContainer: {
    marginLeft: Spacing.sm,
  },
  statValue: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
  },
  footer: {
    marginTop: Spacing.sm,
  },
  hours: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
  },
});