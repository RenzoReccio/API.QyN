import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/domain/model/interface/client.interface";
import { Order } from "src/domain/model/interface/order.interface";
import { OrderDetail } from "src/domain/model/interface/orderDetail.interface";


export class ClientListOrderByIdResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  typeDocument: string;

  @ApiProperty()
  numberDocument: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  constructor(client: Client) {
    this.name = client.name;
    this.typeDocument = client.typeDocument.name
    this.numberDocument = client.numberDocument
    this.area = client.area;
    this.phone = client.phone;
    this.email = client.email;
  }
}

export class OrderDetailListOrderByIdResponse {

  @ApiProperty()
  id: number;

  @ApiProperty()
  urlImage: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  salesPrice: number;

  constructor(detail: OrderDetail) {
    this.name = detail.product.name;
    this.type = detail.product.category.name
    this.quantity = detail.quantity
    this.salesPrice = detail.salesPrice;
    this.urlImage = detail.product.urlImage;
  }
}

export class ListOrderByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderStatusId: number;

  @ApiProperty()
  estimatedDate: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  comments: string;

  @ApiProperty({ type: [ClientListOrderByIdResponse] })
  client: ClientListOrderByIdResponse;

  @ApiProperty({ type: [OrderDetailListOrderByIdResponse], isArray: true })
  orderDetails: OrderDetailListOrderByIdResponse[];

  @ApiProperty()
  punctuation: number;

  @ApiProperty()
  postComments: string;

  constructor(order: Order) {
    this.id = order.id;
    this.orderStatusId = order.orderStatus.id;
    this.estimatedDate = order.estimatedDate;
    this.address = order.address;
    this.comments = order.comments;
    this.punctuation = order.punctuation;
    this.postComments = order.postComments;
    this.client = new ClientListOrderByIdResponse(order.client);
    this.orderDetails = order.orderDetails.map(item => new OrderDetailListOrderByIdResponse(item))
  }
}