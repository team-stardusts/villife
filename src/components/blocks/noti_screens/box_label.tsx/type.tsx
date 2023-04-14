export type ContentPriority = 0 | 1 | 2 | 3;
// @description 0: red, 1: blue , 2: green , 3: grey

export type ContentLableProps = {
    priority: ContentPriority;
    name: string;
};
