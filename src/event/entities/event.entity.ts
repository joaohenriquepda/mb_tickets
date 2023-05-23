import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

const dateEvent = new Date()
const startDateEvent = new Date(dateEvent.setMonth(dateEvent.getMonth() + 8))
const endDateEvent = new Date(new Date(startDateEvent).setHours(startDateEvent.getHours() + 6))

export class Event {

    id?: number

    @ApiProperty({ example: 'Lolapalooza', description: 'The name of the event' })
    @IsNotEmpty()
    title: string

    @ApiPropertyOptional({ example: 'O evento na lama', description: 'The description of the event' })
    description?: string

    @ApiProperty({ example: new Date(), description: 'The date of the event' })
    date?: Date

    @ApiProperty({ example: startDateEvent, description: 'Event start time' })
    start_time: Date

    @ApiProperty({ example: endDateEvent, description: 'Event end time' })
    end_time: Date
}
