import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Calendar, CircleAlert as AlertCircle } from 'lucide-react-native';
import { Colors, FontFamily, BorderRadius, Spacing, FontSizes, Shadows } from '@/constants/theme';
import { Button } from './Button';

interface QueueTicketCardProps {
  id: string;
  centerName: string;
  ticketNumber: number;
  estimatedWaitTime: number;
  status: 'waiting' | 'ready' | 'completed' | 'cancelled';
  createdAt: Date;
  onCancel: (id: string) => void;
}

export function QueueTicketCard({
  id,
  centerName,
  ticketNumber,
  estimatedWaitTime,
  status,
  createdAt,
  onCancel,
}: QueueTicketCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'waiting':
        return Colors.warning[500];
      case 'ready':
        return Colors.success[500];
      case 'completed':
        return Colors.neutral[500];
      case 'cancelled':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'waiting':
        return 'Unasubiri';
      case 'ready':
        return 'Tayari Kuhudumiwa';
      case 'completed':
        return 'Imekamilika';
      case 'cancelled':
        return 'Imefutwa';
      default:
        return '';
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
        <View>
          <Text style={styles.centerName}>{centerName}</Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={Colors.neutral[500]} />
            <Text style={styles.date}>{formatDate(createdAt)}</Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>
      </View>
      
      <View style={styles.ticketContainer}>
        <View style={styles.ticketNumberContainer}>
          <Text style={styles.ticketLabel}>Namba ya Tiketi</Text>
          <Text style={styles.ticketNumber}>{ticketNumber}</Text>
        </View>
        
        <View style={styles.waitTimeContainer}>
          <Clock size={18} color={Colors.primary[500]} />
          <View style={styles.waitTimeTextContainer}>
            <Text style={styles.waitTimeValue}>{estimatedWaitTime} dakika</Text>
            <Text style={styles.waitTimeLabel}>Muda wa Kusubiri</Text>
          </View>
        </View>
      </View>
      
      {status === 'waiting' && (
        <View style={styles.footer}>
          <View style={styles.alertContainer}>
            <AlertCircle size={18} color={Colors.warning[500]} />
            <Text style={styles.alertText}>
              Utaarifiwa dakika 10 kabla ya zamu yako
            </Text>
          </View>
          
          <Button 
            title="Futa Nafasi" 
            variant="outline" 
            size="sm"
            onPress={() => onCancel(id)}
          />
        </View>
      )}
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  centerName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
    marginLeft: Spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.xs,
    color: Colors.white,
  },
  ticketContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  ticketNumberContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: Colors.neutral[200],
    paddingRight: Spacing.md,
  },
  ticketLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
    marginBottom: Spacing.xs / 2,
  },
  ticketNumber: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.xxl,
    color: Colors.primary[600],
  },
  waitTimeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Spacing.md,
  },
  waitTimeTextContainer: {
    marginLeft: Spacing.sm,
  },
  waitTimeValue: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
  },
  waitTimeLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.xs,
    color: Colors.neutral[500],
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    paddingTop: Spacing.md,
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  alertText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.sm,
    color: Colors.neutral[700],
    marginLeft: Spacing.sm,
  },
});