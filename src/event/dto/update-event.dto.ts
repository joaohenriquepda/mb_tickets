import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {

    @ApiProperty({ example: "Evento Atualizado", description: 'title for event' })
    title: string;

}
