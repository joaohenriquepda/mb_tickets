import { Transform } from 'class-transformer';


export function TransformTitle() {
    return Transform((value: any) => {
        const date = new Date().toUTCString()
        return date;
    });
}