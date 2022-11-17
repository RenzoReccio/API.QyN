import { Inject } from "@nestjs/common";
import { OrderRepository } from "src/domain/repository/order.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { ListOrdersDeliveredOutOfTimeTimeResponse } from "./listOrdersDeliveredOutOfTime.response";

export class ListOrdersDeliveredOutOfTimeUseCase implements BaseUseCase<null, ListOrdersDeliveredOutOfTimeTimeResponse[]>{

  constructor(
    @Inject('OrderRepository') private _orderRepository: OrderRepository,
  ) { }

  async get(dto?: null): Promise<ListOrdersDeliveredOutOfTimeTimeResponse[]> {
    let orders = await this._orderRepository.findAllOrderDelivered();
    let actualYear = (new Date()).getFullYear();
    let ordersOfMonth: ListOrdersDeliveredOutOfTimeTimeResponse[] = [];

    for (let index = 0; index < 12; index++) {
      let quantityDeliveredOutOfTime: number = 0;
      let quantityDeliveredInTime: number = 0;
      orders.forEach(item => {
        if (item.updatedAt.getMonth() == index && item.updatedAt > item.estimatedDate && item.updatedAt.getFullYear() == actualYear) quantityDeliveredOutOfTime++;
        if (item.updatedAt.getMonth() == index && item.updatedAt < item.estimatedDate && item.updatedAt.getFullYear() == actualYear) quantityDeliveredInTime++;
      });

      ordersOfMonth.push(new ListOrdersDeliveredOutOfTimeTimeResponse(this.getMonthString(index), quantityDeliveredOutOfTime, quantityDeliveredInTime))

    }
    return ordersOfMonth;
  }

  getMonthString(month: number) {
    switch (month) {
      case 0:
        return 'Enero'
        break;

      case 1:
        return 'Febrero'
        break;
      case 2:
        return 'Marzo'
        break;
      case 3:
        return 'Abril'
        break;
      case 4:
        return 'Mayo'
        break;
      case 5:
        return 'Junio'
        break;
      case 6:
        return 'Julio'
        break;

      case 7:
        return 'Agosto'
        break;

      case 8:
        return 'Septiembre'
        break;

      case 9:
        return 'Octubre'
        break;
      case 10:
        return 'Noviembre'
        break;
      case 11:
        return 'Diciembre'
        break;

      default:
        return ''
        break;
    }
  }
}