import { Transform } from 'class-transformer';
import { isDate, toDate } from 'date-fns';

export function TransformDate() {
    return Transform((value: any) => {
        if (isDate(value)) {
            console.log("PADAM PADAM");

            return value;
        }
        return toDate(value);
    });
}