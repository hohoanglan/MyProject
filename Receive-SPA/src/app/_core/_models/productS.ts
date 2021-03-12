import { ID } from '@datorama/akita';
import { Category } from './category';
import { Pagination } from './pagination';

export interface ProductS {
    id: string;
    name: string;
    catID: number;
    category: Category;
    status: string;
    updated_By: string;
    update_Time: Date;
}


