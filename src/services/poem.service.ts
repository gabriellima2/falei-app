import type { CreatePoemInputDTO, CreatePoemOutputDTO } from "@/dtos/poem.dto";

export interface PoemService {
	create(userID: string, params: CreatePoemInputDTO): CreatePoemOutputDTO;
}
