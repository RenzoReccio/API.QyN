import { Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { UserRol } from "src/domain/model/interface/userRol.interface";
import { UserRolModel } from "src/domain/model/userRol.model";
import { RolRepository } from "src/domain/repository/rol.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { UserRolRepository } from "src/domain/repository/userRol.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { UpdateUserRolsDto } from "./updateUserRols.dto";
import { UpdateUserRolsResponse } from "./updateUserRols.response";

export class UpdateUserRolsUseCase implements BaseUseCase<UpdateUserRolsDto, UpdateUserRolsResponse>{
  constructor(
    @Inject('UserRolRepository') private _userRolRepository: UserRolRepository,
    @Inject('UserRepository') private _userRepository: UserRepository,
    @Inject('RolRepository') private _rolRepository: RolRepository,
    
  ) { }

  async get(dto: UpdateUserRolsDto): Promise<UpdateUserRolsResponse> {
    let user = await this._userRepository.findById(dto.userId);
    if (!user) throw new ResourceNotFound('El usuario indicado no se encuentra registrado');
    let rolIds = new Set(dto.rolIds);
    let rols = await this._rolRepository.findByIds(Array.from(rolIds));
    let userRolsInsert: UserRol[] = [];
    for (const rol of rols) {
      userRolsInsert.push(new UserRolModel(undefined, user, rol))
    }

    let userRolsDeleted = await this._userRolRepository.findByUserId(user.id);
    await this._userRolRepository.deleteMany(userRolsDeleted);
    await this._userRolRepository.insertMany(userRolsInsert)
    return new UpdateUserRolsResponse(user.id);
  }

}