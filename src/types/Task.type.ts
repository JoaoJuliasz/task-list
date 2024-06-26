export type Tasks = {
    [key: string]: Task[]
}

export type Task = {
    name: string,
    type: 'simple' | 'todo'
    list?: Todo[]
}

export type Todo = {
    item: string
    done: boolean
}