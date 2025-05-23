import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  second_name: string | null;
  telegram_id: string;
  phone?: string;
  role: 'user' | 'creator' | 'admin';
  createdAt: string;
  Subscription?: {
    id: number;
    expires_at: string;
    is_active: boolean;
    tariff: {
      name: string;
      price: number;
    };
  }[];
}

export interface Subscription {
  id: number;
  user_id: number;
  tariff_id: number;
  is_active: boolean;
  expires_at: string;
  last_payment: string;
  createdAt: string;
  user: User;
  tariff: {
    id: number;
    name: string;
    price: number;
    type: 'month' | 'year' | 'forever' | 'six_months' | 'three_months';
    channel?: {
      name: string;
    };
  };
}

export interface Payment {
  id: number;
  user_id: number;
  subscription_id: number;
  tariff_id: number;
  payment_id: number;
  value: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  expires_at: string;
  transaction_id: string;
  click_id: string;
  check_url: string | null;
  data: any;
  channel_id: number;
  type: 'buy' | 'subscription' | 'refound';
  user: User;
  tariff: {
    name: string;
    price: number;
    channel: {
      name: string;
    };
  };
  payment: {
    name: string;
    type: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface BackendResponse<T> {
  [key: string]: T[] | {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class AdminService {
  private getAuthHeader() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return {
      headers: {
        'token': token,
      },
    };
  }

  private async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        throw new Error(error.response?.data?.message || 'An error occurred');
      }
      throw error;
    }
  }

  async getUsers(page: number = 1, limit: number = 10, hasSubscription?: boolean) {
    return this.handleRequest(async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(hasSubscription !== undefined && { hasSubscription: hasSubscription.toString() }),
      });
      const response = await axios.get<BackendResponse<User>>(
        `${API_URL}/admin/users?${params}`,
        this.getAuthHeader()
      );
      return response.data;
    });
  }

  async getSubscriptions(
    page: number = 1,
    limit: number = 10,
    userId?: number,
    startDate?: Date,
    endDate?: Date
  ) {
    return this.handleRequest(async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(userId && { user_id: userId.toString() }),
        ...(startDate && { start_date: startDate.toISOString() }),
        ...(endDate && { end_date: endDate.toISOString() }),
      });
      const response = await axios.get<BackendResponse<Subscription>>(
        `${API_URL}/admin/subscriptions?${params}`,
        this.getAuthHeader()
      );
      return response.data;
    });
  }

  async getPayments(page: number = 1, limit: number = 10) {
    return this.handleRequest(async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      const response = await axios.get<BackendResponse<Payment>>(
        `${API_URL}/admin/payments?${params}`,
        this.getAuthHeader()
      );
      return response.data;
    });
  }

  async updateSubscription(id: number, data: { expires_at?: Date; is_active?: boolean }) {
    return this.handleRequest(async () => {
      const response = await axios.patch(
        `${API_URL}/admin/subscription/${id}`,
        data,
        this.getAuthHeader()
      );
      return response.data;
    });
  }

  async deleteSubscription(id: number) {
    return this.handleRequest(async () => {
      const response = await axios.delete(
        `${API_URL}/admin/subscription/${id}`,
        this.getAuthHeader()
      );
      return response.data;
    });
  }

  async createSubscription(data: { user_id: number; tariff_id: number; expires_at: Date }) {
    return this.handleRequest(async () => {
      const response = await axios.post(
        `${API_URL}/admin/subscription`,
        data,
        this.getAuthHeader()
      );
      return response.data;
    });
  }
}

export const adminService = new AdminService(); 