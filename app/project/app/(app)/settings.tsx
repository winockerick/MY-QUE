import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Colors, FontFamily, Spacing, FontSizes, BorderRadius, Shadows } from '@/constants/theme';
import { Button } from '@/components/Button';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  History, 
  BookMarked,
  ChevronRight,
  LogOut,
} from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = React.useState(true);
  
  const settingsOptions = [
    {
      title: 'Taarifa za Mtumiaji',
      icon: <User size={20} color={Colors.primary[500]} />,
      items: [
        {
          name: 'Hariri Taarifa',
          icon: <ChevronRight size={20} color={Colors.neutral[400]} />,
          onPress: () => console.log('Edit profile'),
        },
      ],
    },
    {
      title: 'Taarifa za Arifa',
      icon: <Bell size={20} color={Colors.primary[500]} />,
      items: [
        {
          name: 'Arifa za App',
          isSwitch: true,
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          name: 'Arifa za SMS',
          isSwitch: true,
          value: smsNotificationsEnabled,
          onValueChange: setSmsNotificationsEnabled,
        },
      ],
    },
    {
      title: 'Historia na Vipendeleo',
      icon: <History size={20} color={Colors.primary[500]} />,
      items: [
        {
          name: 'Historia ya Nafasi',
          icon: <ChevronRight size={20} color={Colors.neutral[400]} />,
          onPress: () => console.log('Booking history'),
        },
        {
          name: 'Vituo Pendwa',
          icon: <ChevronRight size={20} color={Colors.neutral[400]} />,
          onPress: () => console.log('Favorite centers'),
        },
      ],
    },
  ];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <SettingsIcon size={24} color={Colors.primary[600]} />
          <Text style={styles.title}>Mipangilio</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profilePhone}>{user?.phone || ''}</Text>
          </View>
        </View>
        
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <View style={styles.sectionHeader}>
              {section.icon}
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            {section.items.map((item, itemIndex) => (
              <View 
                key={itemIndex} 
                style={[
                  styles.settingsItem,
                  itemIndex === section.items.length - 1 && styles.lastItem
                ]}
              >
                <Text style={styles.settingName}>{item.name}</Text>
                
                {item.isSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onValueChange}
                    trackColor={{
                      false: Colors.neutral[300],
                      true: Colors.primary[300],
                    }}
                    thumbColor={item.value ? Colors.primary[600] : Colors.white}
                  />
                ) : (
                  <View style={styles.settingAction} onTouchEnd={item.onPress}>
                    {item.icon}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
        
        <Button
          title="Toka"
          onPress={logout}
          variant="outline"
          size="lg"
          fullWidth
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          rightIcon={<LogOut size={20} color={Colors.error[600]} />}
        />
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
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  profileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  profileInitial: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: Colors.primary[600],
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.lg,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  profilePhone: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.md,
    color: Colors.neutral[600],
  },
  settingsSection: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.md,
    color: Colors.neutral[900],
    marginLeft: Spacing.sm,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    paddingLeft: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingName: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.md,
    color: Colors.neutral[800],
  },
  settingAction: {
    padding: Spacing.xs,
  },
  logoutButton: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xxxl,
    borderColor: Colors.error[500],
  },
  logoutButtonText: {
    color: Colors.error[600],
  },
});