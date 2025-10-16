import { Injectable } from '@angular/core';
import { ProductItem } from '../models/product-item.model';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private readonly STORAGE_KEY = 'shoppingItems';
  private nextId = 1;

  constructor() {
    this.loadFromStorage();
  }

  // Получить все товары
  getItems(): ProductItem[] {
    return this.loadFromStorage();
  }

  // Добавить товар
  addItem(item: Omit<ProductItem, 'id'>): void {
    const items = this.loadFromStorage();
    const newItem: ProductItem = {
      ...item,
      id: this.nextId++
    };
    items.push(newItem);
    this.saveToStorage(items);
  }

  // Удалить товар
  removeItem(id: number): void {
    const items = this.loadFromStorage().filter(item => item.id !== id);
    this.saveToStorage(items);
  }

  // Обновить товар
  updateItem(updatedItem: ProductItem): void {
    const items = this.loadFromStorage().map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    this.saveToStorage(items);
  }

  // Переключить статус покупки
  togglePurchased(id: number): void {
    const items = this.loadFromStorage().map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    this.saveToStorage(items);
  }

  // Получить статистику
  getStats(): { total: number; purchased: number; notPurchased: number } {
    const items = this.loadFromStorage();
    const total = items.length;
    const purchased = items.filter(item => item.purchased).length;
    const notPurchased = total - purchased;
    
    return { total, purchased, notPurchased };
  }

  // Приватные методы для работы с localStorage
  private loadFromStorage(): ProductItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const items = JSON.parse(stored) as ProductItem[];
      // Восстанавливаем nextId на основе максимального id
      this.nextId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      return items;
    }
    return [];
  }

  private saveToStorage(items: ProductItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}