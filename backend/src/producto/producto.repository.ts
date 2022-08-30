import { Repository } from 'typeorm';
import { ProductoEntity } from './producto.entity';

export class ProductoRepository extends Repository<ProductoEntity> {}
