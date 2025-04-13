// Mock data for telegram users
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
  isAdmin: boolean;
}

// Some mock Telegram users for development purposes
export const telegramUsers: TelegramUser[] = [
  {
    id: 123456789,
    first_name: "John",
    last_name: "Doe",
    username: "johndoe",
    photo_url: "https://t.me/i/userpic/320/johndoe.jpg",
    auth_date: Math.floor(Date.now() / 1000),
    hash: "mock_hash_for_john", // In a real app, this would be verified by the backend
    isAdmin: true
  },
  {
    id: 987654321,
    first_name: "Jane",
    last_name: "Smith",
    username: "janesmith",
    photo_url: "https://t.me/i/userpic/320/janesmith.jpg",
    auth_date: Math.floor(Date.now() / 1000),
    hash: "mock_hash_for_jane",
    isAdmin: false
  },
  {
    id: 555666777,
    first_name: "Admin",
    username: "admin_user",
    photo_url: "https://t.me/i/userpic/320/admin.jpg",
    auth_date: Math.floor(Date.now() / 1000),
    hash: "mock_hash_for_admin",
    isAdmin: true
  }
];

// Function to simulate backend verification of Telegram auth data
export function verifyTelegramAuth(authData: any): TelegramUser | null {
  // In a real app, you would validate the hash with your bot token
  // Here we just look up the user in our mock data
  const user = telegramUsers.find(user => user.id === authData.id);
  
  if (user) {
    // Update auth_date to current time for the mock
    return {
      ...user,
      auth_date: Math.floor(Date.now() / 1000)
    };
  }
  
  return null;
}