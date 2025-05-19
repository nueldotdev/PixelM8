import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '@/components/Header';

interface Room {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  membersCount: number;
  unreadCount: number;
}

const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Photography Club',
    lastMessage: 'New event this weekend!',
    timestamp: '2:30 PM',
    membersCount: 12,
    unreadCount: 3,
  },
  {
    id: '2',
    name: 'Travel Buddies',
    lastMessage: 'Check out these photos',
    timestamp: '1:15 PM',
    membersCount: 7,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Book Club',
    lastMessage: 'Thanks for the invite!',
    timestamp: 'Yesterday',
    membersCount: 24,
    unreadCount: 5,
  },
];

export default function ChatRooms() {
  const renderRoomItem = ({ item }: { item: Room }) => {
    return (
      <TouchableOpacity style={styles.roomItem} onPress={() => console.log('Open room', item.id)}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </Text>
        </View>
        <View style={styles.roomDetails}>
          <View style={styles.roomHeader}>
            <Text style={[styles.roomName, item.unreadCount === 0 && {color: 'grey'}]}>{item.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <View style={styles.messageRow}>
            <Text
              style={[styles.lastMessage, item.unreadCount > 0 && styles.unreadMessage]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.lastMessage}
            </Text>
            <View style={styles.membersBadge}>
              <Text style={styles.membersCount}>{item.membersCount} 🧑‍🤝‍🧑</Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Rooms" />
      <FlatList
        data={ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={renderRoomItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  roomItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  roomDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  roomName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastMessage: {
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: 'black',
  },
  membersBadge: {
    backgroundColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  membersCount: {
    fontSize: 12,
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: 'tomato',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadCount: {
    color: 'white',
    fontWeight: 'bold',
  },
});
