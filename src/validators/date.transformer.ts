import { Transform } from 'class-transformer';

export function TransformDate() {

    return Transform((value: any) => {
        return value.toLowerCase()
    });
}