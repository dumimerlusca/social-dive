import ChatService from "../services/chat.service";
export default class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    createChat(body: any, req: any): Promise<import("../schemas/chat.schema").ChatType & {
        _id: any;
    }>;
    getAllChatsOfCurrentUser(req: any): Promise<Omit<import("../schemas/chat.schema").ChatType & {
        _id: any;
    }, never>[]>;
}
