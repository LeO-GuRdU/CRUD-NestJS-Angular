import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class ProductoDto {
  @IsNotBlank({ message: 'El producto no puede estar vacío.' })
  nombre?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(10, { message: 'El precio del producto no debe ser inferior a $10.' })
  precio?: number;
}
