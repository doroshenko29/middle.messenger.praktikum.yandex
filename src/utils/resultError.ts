export type IResultError<IResponseDto> = [IResponseDto, null] | [null, Error];

export default function ResultError<IResponseDto>(responce: string | Error): IResultError<IResponseDto> {
    if(responce instanceof Error) {
        return [null, responce];
    } 

    try {
        return [JSON.parse(responce), null];
    } catch (e) {
        return [responce as IResponseDto, null];
    }
}
