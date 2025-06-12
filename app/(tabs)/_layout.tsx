import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6', // A nice blue color
        headerStyle: {
          backgroundColor: '#f8fafc', // Light gray header
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
        }}
      />
      {/* You can add more tabs here, e.g., for orders, profile, etc. */}
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => <FontAwesome name="list-alt" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}