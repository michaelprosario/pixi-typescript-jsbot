export class Queue {
    items: any;
    headIndex: number;
    tailIndex: number;

    constructor() {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
    }
    enqueue(item: any) {
        this.items[this.tailIndex] = item;
        this.tailIndex++;
    }
    dequeue(): any {
        const item = this.items[this.headIndex];
        delete this.items[this.headIndex];
        this.headIndex++;
        return item;
    }

    peek(): any {
        return this.items[this.headIndex];
    }

    get length() {
        return this.tailIndex - this.headIndex;
    }
}