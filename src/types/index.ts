// ─── Enums ────────────────────────────────────────────────────────────────────

export interface RoleEnum {
  value: string;
  description: string;
}

export interface StatusEnum {
  value: string;
  description: string;
}

// ─── Address ──────────────────────────────────────────────────────────────────

export interface UserAddress {
  addressId?: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  primary: boolean;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface UserModel {
  userId?: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumer?: string; // Note: typo preserved from backend spec
  role: RoleEnum;
  userAddresses?: UserAddress[];
}

export interface UserResponse {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumer?: string;
  role: RoleEnum;
  status: StatusEnum;
  userAddresses: UserAddress[];
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PageSort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: PageSort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: PageSort;
  numberOfElements: number;
  empty: boolean;
}

// ─── Filter State ─────────────────────────────────────────────────────────────

export interface UserFilters {
  status: string;
  role?: string;
  searchTerm?: string;
  page: number;
  size: number;
}
