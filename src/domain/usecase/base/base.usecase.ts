export interface BaseUseCase<Dto, Response> {
  get(dto?: Dto): Promise<Response>;
}