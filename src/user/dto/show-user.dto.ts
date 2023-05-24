import { IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class ShowUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({ example: "email@email", description: 'email for user' })
    email: string;

    @ApiProperty({ example: "João Henrique", description: 'name for user' })
    name: string;


}
