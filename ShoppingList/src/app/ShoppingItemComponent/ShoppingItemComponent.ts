// Input для получениях данных от родителей, Output для отправки родителю
// Component - Декоратор для создания компонента
// EventEmitter - механизм испускания событий
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductItem } from '../models/product-item.model';
import { Category } from '../models/category';

@Component({
  selector: 'app-shopping-item',                // HTML тег
  imports: [CommonModule, FormsModule],
  templateUrl: './ShoppingItemComponent.html',  // Путь к HTML шаблону
  styleUrls: ['./ShoppingItemComponent.css']    // Путь к CSS стилям
})
export class ShoppingItemComponent {
  // Вход - получение данных от родителя
  @Input() item!: ProductItem;
  // Выход - удаление товара
  @Output() remove = new EventEmitter<number>();
  // Выход - изменение статуса покупки
  @Output() togglePurchased = new EventEmitter<number>();
  @Output() update = new EventEmitter<ProductItem>();

  isEditing = false;
  editName = '';
  editAmount = 1;
  editCategory = Category.FOOD;
  editNote = '';

  categories = Object.values(Category);

   // Обработка удаления товара
  onRemove(): void 
  {
    this.remove.emit(this.item.id);         //  Отправка ID товара
  }

   // Обработка изменения статуса покупки
  onTogglePurchased(): void 
  {
    this.togglePurchased.emit(this.item.id); //  Отправка ID товара
  }

  startEditing(): void {
    this.isEditing = true;
    this.editName = this.item.name;
    this.editAmount = this.item.amount;
    this.editCategory = this.item.category;
    this.editNote = this.item.note || '';
  }

  saveEditing(): void {
    if (this.editName.trim()) {
      const updatedItem: ProductItem = {
        ...this.item,
        name: this.editName.trim(),
        amount: this.editAmount,
        category: this.editCategory,
        note: this.editNote.trim() || undefined
      };
      this.update.emit(updatedItem);
      this.isEditing = false;
    }
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  incrementEditAmount(): void {
    this.editAmount++;
  }

  decrementEditAmount(): void {
    if (this.editAmount > 1) {
      this.editAmount--;
    }
  }
}