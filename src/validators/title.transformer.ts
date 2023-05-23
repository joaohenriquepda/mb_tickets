import { Transform } from 'class-transformer';


export function TransformTitle() {
    return Transform((value: any) => {
        return "Padam Padam";
    });
}