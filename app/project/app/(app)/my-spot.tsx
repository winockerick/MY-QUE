import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, FontSizes } from '@/constants/theme';
import { QueueTicketCard } from '@/components/QueueTicketCard';
import { useQueueStore } from '@/store/queueStore';
import { Button } from '@/components/Button';
import { CalendarClock, CirclePlus as PlusCircle } from 'lucide-react-native';

export default function MySpot() {
  const { myTickets, cancelTicket } = useQueueStore();
  const [refreshing, setRefreshing] = useState(false);
  
  const activeTickets = myTickets.filter(ticket => ticket.status !== 'cancelled' && ticket.status !== 'completed');
  const pastTickets = myTickets.filter(ticket => ticket.status === 'cancelled' || ticket.status === 'completed');
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, we would fetch the latest tickets
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const handleCancelTicket = (id: string) => {
    const confirmCancel = () => {
      cancelTicket(id);
    };
    
    if (Platform.OS === 'web') {
      if (confirm('Una uhakika unataka kufuta nafasi hii?')) {
        confirmCancel();
      }
    } else {
      Alert.alert(
        'Futa Nafasi',
        'Una uhakika unataka kufuta nafasi hii?',
        [
          { text: 'Hapana', style: 'cancel' },
          { text: 'Ndio', onPress: confirmCancel }
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <CalendarClock size={24} color={Colors.primary[600]} />
          <Text style={styles.title}>Nafasi Yangu</Text>
        </View>
      </View>
      
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
        {activeTickets.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zamu Zinazoendelea</Text>
            {activeTickets.map(ticket => (
              <QueueTicketCard
                key={ticket.id}
                id={ticket.id}
                centerName={ticket.centerName}
                ticketNumber={ticket.ticketNumber}
                estimatedWaitTime={ticket.estimatedWaitTime}
                status={ticket.status}
                createdAt={ticket.createdAt}
                onCancel={handleCancelTicket}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Hakuna Zamu Inayoendelea</Text>
            <Text style={styles.emptyText}>
              Huna nafasi yoyote kwenye foleni kwa sasa. Pata nafasi yako kwa kuweka kwenye kituo cha huduma.
            </Text>
            <Button
              title="Angalia Vituo vya Huduma"
              onPress={() => router.push('/')}
              rightIcon={<PlusCircle size={20} color={Colors.white} />}
              style={styles.browseButton}
            />
          </View>
        )}
        
        {pastTickets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Historia ya Zamu</Text>
            {pastTickets.map(ticket => (
              <QueueTicketCard
                key={ticket.id}
                id={ticket.id}
                centerName={ticket.centerName}
                ticketNumber={ticket.ticketNumber}
                estimatedWaitTime={ticket.estimatedWaitTime}
                status={ticket.status}
                createdAt={ticket.createdAt}
                onCancel={handleCancelTicket}
              />
            ))}
          </View>
        )}
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
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xxl,
    color: Colors.neutral[900],
    marginLeft: Spacing.sm,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[800],
    marginBottom: Spacing.md,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Spacing.md,
    marginVertical: Spacing.md,
  },
  emptyTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[800],
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  browseButton: {
    marginTop: Spacing.md,
  },
});