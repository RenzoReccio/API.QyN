import { Client } from "../model/interface/client.interface";

export interface ClientRepository {
  findAll(relations?: string[]): Promise<Client[]>;
  findOne(id: number, relations?: string[]): Promise<Client>;
  findByRuc(ruc: string): Promise<Client>;
  insert(client: Client): Promise<Client>;
  update(client: Client): Promise<Client>;
}