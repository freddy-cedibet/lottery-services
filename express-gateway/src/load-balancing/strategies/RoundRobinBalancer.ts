export class RoundRobinBalancer {
    private currentIndex: number;
    private servers: string[];

    constructor(servers: string[]) {
        this.servers = servers;
        this.currentIndex = 0;
    }

    public getNextServer(): string {
        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server;
    }
}
