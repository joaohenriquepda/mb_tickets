import { IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { User } from "../entities/user.entity";

export class CurrentUserDto {

    @ApiProperty({ example: "1", description: 'Id for user' })
    id: number;

    @ApiProperty({ example: "email@email", description: 'email for user' })
    email: string;

    @ApiProperty({ example: "João Henrique", description: 'name for user' })
    name: string;


}
