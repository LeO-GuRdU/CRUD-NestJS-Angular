import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from './common/message.dto';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: ProductoRepository,
  ) {}

  async getAll(): Promise<ProductoEntity[]> {
    const list = await this.productoRepository.find();
    if (!list.length) {
      throw new NotFoundException(new MessageDto('La lista está vacía'));
    }
    return list;
  }

  async findById(id: number): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOneBy({ id: id });
    if (!producto) {
      throw new NotFoundException(new MessageDto('No existe el produto'));
    }
    return producto;
  }

  async findByNombre(nombre: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOneBy({ nombre: nombre });
    return producto;
  }

  async create(dto: ProductoDto): Promise<any> {
    const exist = await this.findByNombre(dto.nombre);
    if (exist) throw new BadRequestException(new MessageDto('Ese nombre ya existe.'));
    const producto = this.productoRepository.create(dto);
    await this.productoRepository.save(producto);
    return new MessageDto(`Producto ${producto.id} Creado`);
  }

  async update(id: number, dto: ProductoDto): Promise<any> {
    const producto = await this.findById(id);
    if (!producto) throw new BadRequestException(new MessageDto('Ese producto no existe.'));
    const exist = await this.findByNombre(dto.nombre);
    if (exist && exist.id !== id) throw new BadRequestException(new MessageDto('Ese nombre ya existe.'));
    dto.nombre ? (producto.nombre = dto.nombre) : (producto.nombre = producto.nombre);
    dto.precio ? (producto.precio = dto.precio) : (producto.precio = producto.precio);
    await this.productoRepository.save(producto);
    return new MessageDto(`Producto ${producto.id} Actualizado`);
  }

  async delete(id: number): Promise<any> {
    const producto = await this.findById(id);
    await this.productoRepository.delete(producto);
    return new MessageDto(`Producto ${producto.id} Eliminado`);
  }
}
