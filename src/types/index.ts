export type LoginForm = {
  username: string;
  password: string;
};

export interface IUser {
  username: string;
  email: string;
  id: number;
  first_name: string;
  last_name: string;
}

export interface IAppStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  error: null | string;
  setError: (error: null | string) => void;
  info: null | string;
  setInfo: (error: null | string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  databaseUrl: null | string;
  setDatabaseUrl: (string) => void;
}

export interface IModelStore {
  models: IModel[];
  setModels: (models: IModel[]) => void;
}

export interface IPowerUserStore {
  powerUsers: IPowerUser[];
  setPowerUsers: (models: IPowerUser[]) => void;
}

export interface IPowerUser {
  id?: number;
  username: string;
  password: string;
}

export interface IModel {
  id: number;
  name: string;
  description: string;
  is_dl: boolean;
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  file5: string;
  file1norm: string;
  file2norm: string;
  file3norm: string;
  file4norm: string;
  file5norm: string;
  file1_size?: string;
  file2_size?: string;
  file3_size?: string;
  file4_size?: string;
  file5_size?: string;
  file1norm_size?: string;
  file2norm_size?: string;
  file3norm_size?: string;
  file4norm_size?: string;
  file5norm_size?: string;
  order: number;
  created_at: string;
}


export interface IModule {
  id?: number;
  name: string;
  status: boolean
}

export interface IModuleStore {
  modules: IModule[];
  setModules: (models: IModule[]) => void;
}