export interface BasicOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface BasicOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface appSlice {
  init: boolean;
  isLoading: boolean;
  error: Error | null;
}

export interface GetOption extends BasicOption {}
