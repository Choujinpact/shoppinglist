import { Category } from './category';

export interface ProductItem // Export делает интерфейс доступным для импорта в других файлах
{
  id: number;
  name: string;
  amount: number;
  purchased: boolean;

  category: Category;
  note?: string;
}
