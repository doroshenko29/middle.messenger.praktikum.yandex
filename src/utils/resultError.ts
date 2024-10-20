export type IResultError<IResponseDto> = [IResponseDto, null] | [null, {reason?: string}];

export default function resultError<IResponseDto>(responce: string | Error): IResultError<IResponseDto> {
    try {
        if(responce instanceof Error) {
            return [null, JSON.parse(responce.message)];
        } 

        return [JSON.parse(responce as string), null];
    } catch (e) {
        return [responce as IResponseDto, e];
    }
}
