import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {

    @ApiProperty({ example: "email@email.com", description: 'email for user' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "@Mb_tickets_1010#", description: 'Password user' })
    @IsString()
    password: string;
}