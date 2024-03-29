import { ApiProperty } from "@nestjs/swagger";

export class User {
    id?: number;

    @ApiProperty({ example: "email@email.com", description: 'email for user' })
    email: string;

    @ApiProperty({ example: "João Henrique", description: 'name for user' })
    name: string;

    @ApiProperty({ example: "@Mb_tickets_1010#", description: 'Password user' })
    password: string;

}