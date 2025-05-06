import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes } from '@/constants/theme';
import { ServiceCenterCard } from '@/components/ServiceCenterCard';
import { useQueueStore } from '@/store/queueStore';
import { Search, Building } from 'lucide-react-native';
import { Input } from '@/components/Input';

export default function ServiceCenters() {
  const { serviceCenters, fetchServiceCenters } = useQueueStore();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    try {
      await fetchServiceCenters();
    } catch (error) {
      console.error('Failed to fetch service centers:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchServiceCenters();
    } finally {
      setRefreshing(false);
    }
  };
  
  const handleServiceCenterPress = (id: string) => {
    router.push(`/service-center/${id}`);
  };
  
  const filteredCenters = serviceCenters.filter(center => 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Building size={24} color={Colors.primary[600]} />
          <Text style={styles.title}>Vituo vya Huduma</Text>
        </View>
        
        <Input
          placeholder="Tafuta kituo..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchContainer}
          rightIcon={<Search size={20} color={Colors.neutral[400]} />}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary[600]} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary[600]]}
              tintColor={Colors.primary[600]}
            />
          }
        >
          {filteredCenters.length > 0 ? (
            filteredCenters.map(center => (
              <ServiceCenterCard
                key={center.id}
                id={center.id}
                name={center.name}
                location={center.location}
                currentQueue={center.currentQueue}
                waitTime={center.waitTime}
                operatingHours={center.operatingHours}
                onPress={handleServiceCenterPress}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery 
                  ? 'Hakuna vituo vinavyolingana na utafutaji wako'
                  : 'Hakuna vituo vya huduma kwa sasa'}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xxl,
    color: Colors.neutral[900],
    marginLeft: Spacing.sm,
  },
  searchContainer: {
    marginBottom: 0,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.md,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});