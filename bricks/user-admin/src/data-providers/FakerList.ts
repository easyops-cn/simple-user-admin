import { createProviderClass } from "@easyops/brick-utils";
import { http } from "@easyops/brick-http";

export interface User {
  firstname: string;
  lastname: string;
  avatar: {
    title: string;
    url: string;
    tag: string;
  };
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
    position: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface FakerListParams {
  pageSize?: number;
}

const prefix = "/api/gateway";
const service = "faker.service.get";
const api = "api/v1/person";

export async function FakerList(
  params: FakerListParams
): Promise<{ list: User[] }> {
  const pageSize = params?.pageSize ?? 10;
  const url = `${prefix}/${service}/${api}/${pageSize}`;
  const resp = await http.get<{ data: User[] }>(url);
  const users = resp.data;
  return { list: users };
}

customElements.define(
  "user-admin.provider-faker-list",
  createProviderClass(FakerList)
);
