import { Action } from 'redux';
export interface IAction<T = string> extends Action<T> {
}
export interface IActionWithPayload<T = string, U = any> extends IAction<T> {
    readonly payload: U;
}
export declare const createActionWithPayload: <T = string, U = any>(type: T, payload: U) => IActionWithPayload<T, U>;
export declare const createAction: <T = string>(type: T) => IAction<T>;
