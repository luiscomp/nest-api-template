
import {Category} from '../../category/entities/category.entity'


export class Player {
  id: string ;
name: string ;
email: string ;
phone: string ;
ranking: string  | null;
rankPosition: number  | null;
urlPhoto: string  | null;
category?: Category ;
categoryId: string ;
created_at: Date  | null;
updated_at: Date  | null;
}
