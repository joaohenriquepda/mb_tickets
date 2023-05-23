import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinDate } from "class-validator";
import { Event } from "../entities/event.entity";
import { ApiProperty } from "@nestjs/swagger";
import { TransformDate } from "src/validators/date.transformer";
import { TransformTitle } from "src/validators/title.transformer";

export class CreateEventDto extends Event {

    @IsString()
    @IsNotEmpty()
    @Length(10, 20)
    @TransformTitle()
    title: string

    @IsOptional()
    @IsString()
    description: string;

    @IsDate()
    @TransformDate()
    date: Date;

    @IsDate()
    @MinDate(new Date())
    @TransformDate()
    start_time: Date;

    @IsDate()
    @MinDate(new Date())
    @TransformDate()
    end_time: Date;

}

export class ShowEventDto extends CreateEventDto {

    @ApiProperty({ example: "8728978924", description: 'Id for event' })
    @IsNumber()
    id?: number;
}
