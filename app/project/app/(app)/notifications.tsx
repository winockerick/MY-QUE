import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Colors, FontFamily, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';
import { Bell, CalendarCheck, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

// Mock notification data
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Uko karibu kuhudumiwa',
    message: 'Zamu yako itafika baada ya dakika 10 katika Hospitali ya Muhimbili',
    type: 'warning',
    date: new Date(2023, 8, 15, 9, 25),
    read: false,
  },
  {
    id: '2',
    title: 'Umewekwa kwenye foleni',
    message: 'Umewekwa kwenye foleni ya TTCL Makao Makuu. Namba yako ni 23.',
    type: 'info',
    date: new Date(2023, 8, 14, 13, 10),
    read: true,
  },
  {
    id: '3',
    title: 'Huduma imekamilika',
    message: 'Huduma yako katika Benki ya NMB imekamilika. Asante kwa kutumia huduma zetu.',
    type: 'success',
    date: new Date(2023, 8, 12, 10, 45),
    read: true,
  },
  {
    id: '4',
    title: 'Uko karibu kuhudumiwa',
    message: 'Zamu yako itafika baada ya dakika 5 katika Ofisi ya Uhamiaji',
    type: 'warning',
    date: new Date(2023, 8, 10, 15, 30),
    read: true,
  },
];

type NotificationType = 'info' | 'warning' | 'success';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: Date;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    setRefreshing(true);
    // In a real app, we would fetch the latest notifications
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'info':
        return <CalendarCheck size={24} color={Colors.primary[500]} />;
      case 'warning':
        return <AlertTriangle size={24} color={Colors.warning[500]} />;
      case 'success':
        return <CheckCircle size={24} color={Colors.success[500]} />;
      default:
        return <Bell size={24} color={Colors.neutral[500]} />;
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('sw-TZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Bell size={24} color={Colors.primary[600]} />
          <Text style={styles.title}>Arifa</Text>
        </View>
        
        {notifications.some(n => !n.read) && (
          <Text style={styles.markAllRead} onPress={markAllAsRead}>
            Soma Zote
          </Text>
        )}
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
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <View 
              key={notification.id} 
              style={[
                styles.notificationCard,
                !notification.read && styles.unreadCard
              ]}
            >
              <View style={styles.notificationIcon}>
                {getNotificationIcon(notification.type)}
              </View>
              
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  {notification.title}
                  {!notification.read && <View style={styles.unreadDot} />}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.notificationDate}>
                  {formatDate(notification.date)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Hakuna Arifa</Text>
            <Text style={styles.emptyText}>
              Utapokea arifa mara tu zamu yako inapokaribia au kukamilika.
            </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  markAllRead: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.sm,
    color: Colors.primary[600],
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  notificationCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    ...Shadows.sm,
  },
  unreadCard: {
    backgroundColor: Colors.primary[50],
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary[600],
  },
  notificationIcon: {
    marginRight: Spacing.md,
    marginTop: Spacing.xs,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[600],
    marginLeft: Spacing.sm,
  },
  notificationMessage: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.sm,
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  notificationDate: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
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
  },
});