import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddItemFormComponent } from '../AddItemFormComponent/AddItemFormComponent';
import { ShoppingItemComponent } from '../ShoppingItemComponent/ShoppingItemComponent';
import { ProductItem } from '../models/product-item.model';
import { ShoppingService } from '../ShoppingService/shopping-service';
import { Category } from '../models/category';

type SortOption = 'Name' | 'Status' | 'Category' | 'None';

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule, FormsModule, AddItemFormComponent, ShoppingItemComponent],
  templateUrl: './ShoppingListComponent.html',
  styleUrls: ['./ShoppingListComponent.css']
})
export class ShoppingListComponent implements OnInit 
{
  shoppingItems: ProductItem[] = [];
  filteredItems: ProductItem[] = [];
  stats = { total: 0, purchased: 0, notPurchased: 0 };

  //Поиск и сортировка
  searchRequest = '';
  sortOption: SortOption = 'None';
  categories = Object.values(Category);

  constructor(private shoppingService: ShoppingService) {}

  // Метод для отображения человеко-читаемых labels сортировки
getSortLabel(sortOption: SortOption): string {
  const labels = {
    'Name': 'Name',
    'Status': 'Status',
    'Category': 'Category',
    'None': 'None'
  };
  return labels[sortOption];
}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.shoppingItems = this.shoppingService.getItems();
    this.applyFilters();  // для того чтобы сохранялись предметы в списке при загрузке
    this.updateStats();
  }

  onAddItem(newItem: Omit<ProductItem, 'id'>): void {
    this.shoppingService.addItem(newItem);
    this.loadItems();
  }

  onRemoveItem(itemId: number): void {
    this.shoppingService.removeItem(itemId);
    this.loadItems();
  }

  onTogglePurchased(itemId: number): void {
    this.shoppingService.togglePurchased(itemId);
    this.loadItems();
  }

  onUpdateItem(updatedItem: ProductItem): void {
    this.shoppingService.updateItem(updatedItem);
    this.loadItems();
  }

  applyFilters(): void 
  {
    let items = [...this.shoppingItems];
  

    if (this.searchRequest.trim()) 
    {
      const request = this.searchRequest.toLowerCase().trim();
      items = items.filter(item => item.name.toLowerCase().includes(request));
    }
      // Сортировка
      items = this.sortItems(items);

    this.filteredItems = items;
  }


  // Сортировка товаров
  private sortItems(items: ProductItem[]): ProductItem[] {
    switch (this.sortOption) {
      case 'Name':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      
      case 'Status':
        return items.sort((a, b) => {
          if (a.purchased === b.purchased) return 0;
          return a.purchased ? 1 : -1;
        });
      
      case 'Category':
        return items.sort((a, b) => a.category.localeCompare(b.category));
      
      case 'None':
      default:
        return items;
    }
  }

  // Обработчики для поиска и сортировки
  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  // Сброс фильтров
  resetFilters(): void {
    this.searchRequest = '';
    this.sortOption = 'None';
    this.applyFilters();
  }

  private updateStats(): void {
    this.stats = this.shoppingService.getStats();
  }

  
}