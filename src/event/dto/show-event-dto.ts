import { IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateEventDto } from "./create-event.dto";

export class ShowEventDto extends PartialType(CreateEventDto) {

    @ApiProperty({ example: "8728978924", description: 'Id for event' })
    @IsNumber()
    id?: number;
}
