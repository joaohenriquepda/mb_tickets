import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Event } from "../entities/event.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto extends Event {

    @IsString()
    @IsNotEmpty()
    @Length(10, 50)
    title: string

    @IsOptional()
    @IsString()
    description: string;


    date: Date;


    start_time: Date;


    end_time: Date;

}

export class ShowEventDto extends CreateEventDto {

    @ApiProperty({ example: "8728978924", description: 'Id for event' })
    @IsNumber()
    id?: number;
}
