interface IResponse {
    success: boolean;
    message?: string;
    data?: object | null | any[];
  }

export const createResponse = (data?: IResponse['data'], message?: string): IResponse => {
    return { data, message, success: true };
  };