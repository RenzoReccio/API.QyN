import { Injectable, Inject } from "@nestjs/common";
import { ResourceNotFound } from "src/domain/error/resourceNotFound.exception";
import { OrderVehicleModel } from "src/domain/model/orderVehicle.model";
import { OrderRepository } from "src/domain/repository/order.repository";
import { OrderVehicleRepository } from "src/domain/repository/orderVehicle.repository";
import { VehicleRepository } from "src/domain/repository/vehicle.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateOrderVehicleDto } from "./createOrderVehicle.dto";
import { CreateOrderVehicleResponse } from "./createOrderVehicle.response";

@Injectable()
export class CreateOrderVehicleUseCase implements BaseUseCase<CreateOrderVehicleDto, CreateOrderVehicleResponse>{

  constructor(
    @Inject('OrderVehicleRepository') private _orderVehicleRepository: OrderVehicleRepository,
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
    @Inject('VehicleRepository') private _vehicleRepository: VehicleRepository,
  ) { }

  async get(dto: CreateOrderVehicleDto): Promise<CreateOrderVehicleResponse> {
    let order = await this._orderRepository.findOne(dto.orderId);
    if(!order) throw new ResourceNotFound('El pedido indicado no se encuentra registrado');

    let vehicle = await this._vehicleRepository.findOne(dto.vehicleId)
    if(!vehicle) throw new ResourceNotFound('El vehiculo indicado no se encuentra registrado');
    
    let orderVehicleExisting = await this._orderVehicleRepository.findByOrderId(dto.orderId)
    if(orderVehicleExisting) throw new ResourceNotFound('El pedido indicado ya se encuentra asignado');

    let orderVehicle = new OrderVehicleModel(undefined, order, vehicle, new Date(dto.date))

    orderVehicle = await this._orderVehicleRepository.insert(orderVehicle)
    return null;
  }
}