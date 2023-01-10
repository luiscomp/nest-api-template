
import {Player} from '../../player/entities/player.entity'


export class Category {
  id: string ;
name: string ;
players?: Player[] ;
created_at: Date  | null;
updated_at: Date  | null;
}
