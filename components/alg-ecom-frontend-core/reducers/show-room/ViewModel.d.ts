export interface ShowRoomListStateModel {
    showroomsList: ShowRoomDetailsModel[];
}
export interface ShowRoomDetailsModel {
    showroomID: number;
    showroomName: string;
    isServiceCenter: string;
    ShowRoomLocation: string;
    showroomType: string;
}
