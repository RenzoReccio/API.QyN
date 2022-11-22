import { Inject, Injectable } from "@nestjs/common";
import { IncorrectPassword } from "src/domain/error/incorrectPassword.error";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { ValidationError } from "src/domain/error/validation.error";
import { Menu } from "src/domain/model/interface/menu.interface";
import { UserRol } from "src/domain/model/interface/userRol.interface";
import { RolRepository } from "src/domain/repository/rol.repository";
import { UserRepository } from "src/domain/repository/user.repository";
import { UserRolRepository } from "src/domain/repository/userRol.repository";
import { AuthService } from "src/utils/auth/auth.service";
import { BaseUseCase } from "../../base/base.usecase";
import { LoginDto } from "./login.dto";
import { LoginResponse } from "./login.response";

@Injectable()
export class LoginUseCase implements BaseUseCase<LoginDto, string>{

  constructor(
    @Inject('UserRepository') private _userRepository: UserRepository,
    @Inject('UserRolRepository') private _rol: UserRolRepository,
    private _authService: AuthService
  ) {
  }

  async get(dto?: LoginDto): Promise<string> {

    let user = await this._userRepository.findByEmail(dto.userName.trim(), ['person', 'client', 'client.typeDocument']);
    if (!user) throw new ResourceNotFound(`No se encontró el usuario con correo: ${dto.userName.trim()}`);

    if (!user.isActive) throw new ValidationError(`El usuario indicado se encuentra inhabilitado`);

    const isPasswordMatching: boolean = await this._authService.validatePassword(dto.password.trim(), user.password.trim());
    if (!isPasswordMatching) throw new IncorrectPassword();

    const rolWithMenus = await this._rol.findByUserId(user.id, ['rol', 'rol.menus', 'rol.menus.childs', 'rol.menus.parent']);
    let menus = this.buildMenu(rolWithMenus);
    const dataToken = new LoginResponse(user, menus)

    const token = this._authService.createToken(dataToken);
    return token;
  }

  buildMenu(userRol: UserRol[]) {
    let menus: Menu[] = [].concat(...userRol.map(item => { return item.rol.menus }));
    let parentMenus: Menu[] = []
    let childMenus: Menu[] = []

    for (const menu of menus) {
      menu.childs = [];
      let isMenuParent = parentMenus.find(item => item.id == menu.id)
      let isMenuChild = childMenus.find(item => item.id == menu.id)
      if (!isMenuParent && menu.parent == null) parentMenus.push(menu)
      if (!isMenuChild && menu.parent != null) childMenus.push(menu)
    }

    for (const parent of parentMenus) {
      for (const child of childMenus) {
        if (child.parent.id == parent.id) {
          parent.childs.push(child)

        }
      }
    }

    return parentMenus.sort((({ id: a }, { id: b }) => a - b));
  }
}