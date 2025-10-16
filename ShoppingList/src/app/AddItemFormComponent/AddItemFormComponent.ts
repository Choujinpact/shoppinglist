// Импорт необходимых модулей и декораторов (Output, EventEmitter - для передачи данных родительскому компоненту, FormsModule - модуль для работы с формами и ngModel, ProductItem - наш интерфейс данных)

import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../models/product-item.model';
import { Category } from '../models/category';

// Декоратор компонента - метаданные
@Component({
  selector: 'app-add-item-form', // HTML тег компонента
  imports: [FormsModule, CommonModule], 
  templateUrl: './AddItemFormComponent.html', // связь с HTML файлом
  styleUrls: ['./AddItemFormComponent.css'] // Связь с CSS файлом
}) 
export class AddItemFormComponent {
  @Output() addItem = new EventEmitter<Omit<ProductItem, 'id'>>();

    // Переменные компонента для хранения названия и количества
  productName = '';
  amount = 1;
  category = Category.FOOD;
  note = '';

  // Получаем массив значений enum для использования в шаблоне
  categories = Object.values(Category);


  // Метод обработки отправки формы (trim - Обрезает пробелы)
  onSubmit(): void {
    if (this.productName.trim())        // Проверка: не пустая строка
      {      
      this.addItem.emit({               // Отправка данных родителю
        name: this.productName.trim(),  // Название без пробелов
        amount: this.amount,            // Количество
        purchased: false,               // Статус "не куплено"
        category: this.category,
        note: this.note.trim() || undefined
      });
      
      // // Сброс формы после отправки
      this.productName = '';
      this.amount = 1;
      this.category = Category.FOOD;
      this.note = '';
    }
  }

  incrementAmount(): void {
    this.amount++;
  }

  decrementAmount(): void {
    if (this.amount > 1) // защита от отрицательных значений
    {
      this.amount--;
    }
  }
}