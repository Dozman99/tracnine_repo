export class ApiResponse<T> {
  message!: string;
  data!: T;
  status!: string;
  success!: boolean;
}
