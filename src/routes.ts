import {
  UserController,
  UserControllerActions,
} from "./controller/user_controller";
import { Methods } from "./config/methods";
import {
  TodoController,
  TodoControllerActions,
} from "./controller/todo_controller";
import {
  AuthController,
  AuthControllerActions,
} from "./controller/auth_controller";

export const Routes = [
  {
    method: Methods.GET,
    route: "/users",
    controller: UserController,
    action: UserControllerActions.all,
  },
  {
    method: Methods.POST,
    route: "/users",
    controller: UserController,
    action: UserControllerActions.save,
  },
  {
    method: Methods.GET,
    route: "/todos",
    controller: TodoController,
    action: TodoControllerActions.allByUid,
  },
  {
    method: Methods.GET,
    route: "/todos/:id",
    controller: TodoController,
    action: TodoControllerActions.one,
  },
  {
    method: Methods.POST,
    route: "/todos",
    controller: TodoController,
    action: TodoControllerActions.save,
  },
  {
    method: Methods.DELETE,
    route: "/todos/:id",
    controller: TodoController,
    action: TodoControllerActions.remove,
  },
  {
    method: Methods.POST,
    route: "/signup",
    controller: AuthController,
    action: AuthControllerActions.signUp,
  },
  {
    method: Methods.POST,
    route: "/signin",
    controller: AuthController,
    action: AuthControllerActions.signIn,
  },
];
