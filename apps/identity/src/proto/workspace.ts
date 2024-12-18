// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.2
// source: workspace.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { WorkspaceType } from "./common";

export const protobufPackage = "identity";

export interface CreateWorkspaceRequest {
  name: string;
}

export interface CreateWorkspaceReply {
  id: string;
  name: string;
}

export interface GetWorkspaceReply {
  id: string;
  name: string;
  type: WorkspaceType;
  createdAt: Date | undefined;
  createdBy: string;
  updatedAt: Date | undefined;
  updatedBy: string;
}

export interface GetWorkspaceRequest {
  id: string;
}

export interface GetNotebooksRequest {
  workspaceId: string;
}

export interface Notebook {
  id: string;
  title: string;
  order: number;
  workspaceId: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  createdBy: string;
  updatedBy: string;
}

export interface GetNotebooksReply {
  notebooks: Notebook[];
}

export const IDENTITY_PACKAGE_NAME = "identity";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface WorkspaceServiceClient {
  createWorkspace(request: CreateWorkspaceRequest): Observable<CreateWorkspaceReply>;

  getWorkspace(request: GetWorkspaceRequest): Observable<GetWorkspaceReply>;

  getNotebooks(request: GetNotebooksRequest): Observable<GetNotebooksReply>;
}

export interface WorkspaceServiceController {
  createWorkspace(
    request: CreateWorkspaceRequest,
  ): Promise<CreateWorkspaceReply> | Observable<CreateWorkspaceReply> | CreateWorkspaceReply;

  getWorkspace(
    request: GetWorkspaceRequest,
  ): Promise<GetWorkspaceReply> | Observable<GetWorkspaceReply> | GetWorkspaceReply;

  getNotebooks(
    request: GetNotebooksRequest,
  ): Promise<GetNotebooksReply> | Observable<GetNotebooksReply> | GetNotebooksReply;
}

export function WorkspaceServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createWorkspace", "getWorkspace", "getNotebooks"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WorkspaceService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WorkspaceService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WORKSPACE_SERVICE_NAME = "WorkspaceService";
