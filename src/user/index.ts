class Users {
    private users = new Map();
    private _bot: any;
    constructor(bot: any) {
        this._bot = bot;
    }
    async find(name: string) {
        let user = this.users.get(name);
        if (!user) {
            user = await this._bot.Contact.find({ name });
            if (user) {
                this.users.set(name, user);
            }
        }
        return user;
    }
}

export default Users;
